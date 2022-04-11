const Topic = require('../models/topic');
const express = require('express');
const router = express.Router();
const topicUtils = require('../utils/search');
const subjectUtils = require('../utils/search')

// Create new topic
const createTopic = function (req, res) {
    let topic = new Topic(
        {
            topic: req.body.topic,
            subId: req.params.subId,
            userId: req.params.userId,
            ageId: req.params.ageId


        }
    );
    // save topic in the database.
    topic.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while creating the topic."
            });
        });
}

// Get All topics
const getAllTopics = function (req, res) {
    Topic.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No Topic found!";
            else message = 'Topics successfully retrieved';

            res.send(data);
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while retrieving Topics."
            });
        });
}

// Get topics by userId
const getTopicByAgeId = function (req, res) {
    Topic.find({ userId: req.params.userId, subId: req.params.subId })
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No Topic found!";
            else message = 'Topics successfully retrieved';
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send('Some error occured')
        })
}

// Get topics by userId
const getTopicBySubjectId = function (req, res) {
    Topic.find({ userId: req.params.userId, subId: req.params.subId })
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No Topic found!";
            else message = 'Topics successfully retrieved';
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send('Some error occured')
        })
}


// Search topic
const topicController = {};
topicController.searchTopic = async (req, res) => {
    try {
        const topic = req.query.topic;
        console.log(topic)
        const result = await topicUtils.searchTopic(topic);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(404).json({ error: err.error });
    }
};

// Search Subject
const subjectController = {};
subjectController.searchSubject = async (req, res) => {
    try {
        const subject = req.query.subject;
        const result = await subjectUtils.searchSubject(subject);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(404).json({ error: err.error });
    }
};

// Routes
router.post('/create/:userId/:subId/:ageId', createTopic)
router.get('/', getAllTopics)
router.get('/get/:userId/:subId', getTopicBySubjectId)
router.get('/get/:userId/:subId/:ageId', getTopicByAgeId)

router.get('/search', topicController.searchTopic);
router.get('/searchSub', subjectController.searchSubject);

module.exports = router;