const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

// Create user API
const createUser = async function (req, res) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    // First Validate The Request.
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits.
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exists!');
    } else {
        // Insert the new user if they do not exist yet.
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            subject: req.body.subject
        });

        // Hash the password before saving into database.
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        // Generating the token against the user id.
        const token = jwt.sign({ id: user._id }, jwtSecretKey, { expiresIn: '1800s' });
        await user.save();
        res.status(200).send({ user, token });
    }
};

// Authentication API
const getUserByToken = function (req, res) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var token = req.headers['x-access-token'];

    // Token authentication
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, jwtSecretKey, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
    });
};

// const getUserByToken = function (req, res) {
//         User.findById(req.userId, { password: 0 }, function (err, user) {
//             if (err) return res.status(500).send("There was a problem finding the user.");
//             if (!user) return res.status(404).send("No user found.");

//             res.status(200).send(user);
//         });
// };

// Login user API
const loginUser = function (req, res) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        // Compare hashed and user password
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // Generating JWT token
        const token = jwt.sign({ id: user._id }, jwtSecretKey, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
};

// Get User by its ID
function getUserById(req, res) {
    User.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'User successfully retrieved',
                data: data
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                success: false,
                message: "Error retrieving User with id " + req.params.id
            });
        });
};

// Get All users array
function getAllUsers(req, res) {
    User.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No User found!";
            else message = 'Users successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Delete User by its ID
function deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "User successfully deleted!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                success: false,
                message: "Could not delete product with id " + req.params.id
            });
        });
};

// Update a user  by the id.
function userUpdate(req, res) {
    // find user and update
    let user = User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.params.id
                });
            }
            // const salt = bcrypt.genSalt(10);
            // user.password = bcrypt.hash(user.password, salt);
            // user.save();
            res.send({
                success: true,
                data: data
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                success: false,
                message: "Error updating User with id " + req.params.id
            });
        });
};



//Routes
router.post('/login', loginUser);
router.post('/create', createUser);
router.get('/me', getUserByToken);
router.get('/:id', getUserById);
router.get('/', getAllUsers)
router.put('/update/:id', userUpdate);
router.delete('/delete/:id', deleteUser);

module.exports = router;