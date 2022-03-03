const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const getUserByToken = function (req, res) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    var token = req.headers['x-access-token'];
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

const loginUser = function (req, res) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        // Compare hashed and user password
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user._id }, jwtSecretKey, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });

};

//Routes
router.post('/login', loginUser);
router.post('/create', createUser);
router.get('/me', getUserByToken);
// router.get('/:id', mcqs_details);
// router.put('/update/:id', mcqs_update);
// router.delete('/delete/:id', mcqs_delete);

module.exports = router;