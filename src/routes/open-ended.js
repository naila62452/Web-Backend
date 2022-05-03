const express = require('express');
const router = express.Router();
const Open_Ended = require('../models/open-ended');


//Create a new question
function isValidQuestionRequest(req) {
    if (!req.body.question || !req.body.feedback) {
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
    // create a question
    let open_ended = new Open_Ended(
        {
            question: req.body.question,
            feedback: req.body.answer,
            userId: req.params.userId,
            topicId: req.params.topicId
        }
    );
    // save question in the database.
    open_ended.save()
        .then(data => {
            res.send(
                data
            );
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while creating the question."
            });
        });
};

// retrieve and return all question.
function allQuestions(req, res) {
    console.log("hi")
    Open_Ended.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No question  found!";
            else message = 'Question successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while retrieving question."
            });
        });
};

// Get question by topicId and userId
const getQuestionByTopic = function (req, res) {
    True_false.find({ userId: req.params.userId, topicId: req.params.topicId})
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No question found!";
            else message = 'question successfully retrieved';
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send('Some error occured')
        })
}

// // Delete a true false with the specified id.
// function trueFalse_delete(req, res) {
//     True_false.findByIdAndRemove(req.params.id)
//         .then(data => {
//             if (!data) {
//                 return res.status(404).send({
//                     success: false,
//                     message: "True false not found with id " + req.params.id
//                 });
//             }
//             res.send({
//                 success: true,
//                 message: "True false successfully deleted!"
//             });
//         })
// };
// delete a mcqs with the specified id.
// function mcqs_delete(req, res) {
//     Mcqs.findByIdAndRemove(req.params.id)
//         .then(data => {
//             if (!data) {
//                 return res.status(404).send({
//                     success: false,
//                     message: "Shop not found with id " + req.params.id
//                 });
//             }
//             res.send({
//                 success: true,
//                 message: "Shop successfully deleted!"
//             });
//         })
// };

// find a single mcqs with a id.
// function mcqs_details(req, res) {
//     console.log("hello")
//     Mcqs.findById(req.params.id)
//         .then(data => {
//             if (!data) {
//                 return res.status(404).send({
//                     success: false,
//                     message: "Mcqs not found with id " + req.params.id
//                 });
//             }
//             res.send({
//                 success: true,
//                 message: 'Mcqs successfully retrieved',
//                 data: data
//             });
//         })
// };

//Routes
router.get('/', allQuestions);
router.get('/get/:userId/:topicId', getQuestionByTopic);
router.post('/create/:userId/:topicId', CreateQuestion);
//router.get('/:id', mcqs_details);
// router.put('/update/:id', mcqs_update);
// router.delete('/delete/:id', trueFalse_delete);
module.exports = router;