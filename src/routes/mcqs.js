const express = require('express');
const router = express.Router();
const Mcqs = require('../models/mcqs');


//Create a new question
function isValidQuestionRequest(req) {
    if (!req.body.question || !req.body.options) {
        return false;
    }
    return true;
}
function CreateQuestion(req, res) {

    // validate request
    if (!isValidQuestionRequest(req)) {
        return res.status(400).send({
            success: false,
            message: "Please fill out all the required feilds"
        });
    }
    // create a mcqs
    let mcqs = new Mcqs(
        {
            question: req.body.question,
            options: req.body.options
        }
    );

    // save mcqs in the database.
    mcqs.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while creating the mcqs."
            });
        });
};

// retrieve and return all mcqs.
function allMcqs_questions(req, res) {
    Mcqs.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No Mcqs found!";
            else message = 'Mcqs successfully retrieved';

            res.send(data);
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while retrieving Mcqs."
            });
        });
};

// delete a mcqs with the specified id.
function mcqs_delete(req, res) {
    Mcqs.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Mcqs not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Mcqs successfully deleted!"
            });
        })
};

// find a single mcqs with a id.
function mcqs_details(req, res) {
    Mcqs.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Mcqs not found with id " + req.params.id
                });
            }
            res.send(data);
        })
};

// update a Mcqs  by the id.
function mcqs_update (req, res) {
    // validate request
    if(!req.body.question || !req.body.options) {
        return res.status(400).send({
            success: false,
            message: "Please enter All details"
        });
    }

    // find Mcqs and update
    Mcqs.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Mcqs not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Mcqs not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating Mcqs with id " + req.params.id
        });
    });
};

//Routes
router.get('/', allMcqs_questions);
router.post('/create', CreateQuestion);
router.get('/:id', mcqs_details);
router.put('/update/:id', mcqs_update);
router.delete('/delete/:id', mcqs_delete);
module.exports = router;