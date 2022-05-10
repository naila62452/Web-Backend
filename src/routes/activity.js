const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const multer = require('multer')
var fs = require('fs');
const url = require('url');

const currentTime = new Date()
const store = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = `uploads/activity/${currentTime.getUTCFullYear()}/`
        fs.mkdir(path, { recursive: true }, function (err) {
            if (err) return cb(err);
            cb(null, path);
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const store_audio = multer.diskStorage({
    destinations: function (req, files, cb) {
        let path = `uploads/activity/audio/${currentTime.getUTCFullYear()}/`
        fs.mkdir(path, { recursive: true }, function (err) {
            if (err) return cb(err);
            cb(null, path);
        });
    },
    filenames: function (req, files, cb) {
       cb(null, files.originalname);
    }
});


const upload = multer({ storage: store }).single('img');

const upload_audio = multer({ storage: store_audio }).single('audio');


//Create a new question
function CreateActivity(req, res) {
    let imagesPaths = [];
    let audioPaths = [];
    if (req.files) {
        imagesPaths = req.files.map(element => {
            return currentTime.getUTCFullYear() + "/" + element.originalname;
        })
        
        audioPaths = req.files.map(elements => {
            return currentTime.getUTCFullYear() + "/" + elements.originalname;
        });
    }
    else {
        imagesPaths.push(req.file.originalname)
        audioPaths.push(req.file.originalname)
    }
    let activity = new Activity(
        {
            intro: req.body.intro,
            video_url: req.body.video_url,
            img: imagesPaths,
            audio: audioPaths,
            question: req.body.question,
            statement1: req.body.statement1,
            answer1: req.body.answer1,
            statement2: req.body.statement2,
            answer2: req.body.answer2,
            statement3: req.body.statement3,
            answer3: req.body.answer3,
            statement4: req.body.statement4,
            answer4: req.body.answer4,
            statement5: req.body.statement5,
            statement6: req.body.statement6,
            statement7: req.body.statement7,
            statement8: req.body.statement8,
            
           
            // userId: req.params.userId,
            // topicId: req.params.topicId,
            // typeId: req.params.typeId,
            // subId: req.params.subId

        }
    );

    // save activity in the database.
    activity.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while creating the activity."
            });
        });
};

// Get mcqs by topic
// const getMcqsByTopic = function (req, res) {
//     Mcqs.find({ userId: req.params.userId, topicId: req.params.topicId, typeId: req.params.typeId })
//         .then(data => {
//             var message = "";
//             if (data === undefined || data.length == 0) message = "No mcqs found!";
//             else message = 'mcqs successfully retrieved';
//             res.status(200).send(data)
//         }).catch(err => {
//             res.status(400).send('Some error occured')
//         })
// }
// retrieve and return all activity.
// function allMcqs_questions(req, res) {
//     Mcqs.find()
//         .then(data => {
//             var message = "";
//             if (data === undefined || data.length == 0) message = "No Mcqs found!";
//             else message = 'Mcqs successfully retrieved';

//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 success: false,
//                 message: err.message || "Some error occurred while retrieving Mcqs."
//             });
//         });
// };

// delete a mcqs with the specified id.
// function mcqs_delete(req, res) {
//     Mcqs.findByIdAndRemove(req.params.id)
//         .then(data => {
//             if (!data) {
//                 return res.status(404).send({
//                     success: false,
//                     message: "Mcqs not found with id " + req.params.id
//                 });
//             }
//             res.send({
//                 success: true,
//                 message: "Mcqs successfully deleted!"
//             });
//         })
// };

// find a single mcqs with a id.
// function mcqs_details(req, res) {
//     Mcqs.findById(req.params.id)
//         .then(data => {
//             if (!data) {
//                 return res.status(404).send({
//                     success: false,
//                     message: "Mcqs not found with id " + req.params.id
//                 });
//             }
//             res.send(data);
//         })
// };

// // update a Mcqs  by the id.
// function mcqs_update(req, res) {
//     // validate request
//     if (!req.body.question || !req.body.options) {
//         return res.status(400).send({
//             success: false,
//             message: "Please enter All details"
//         });
//     }

//     // find Mcqs and update
//     Mcqs.findByIdAndUpdate(req.params.id, {
//         $set: req.body
//     }, { new: true })
//         .then(data => {
//             if (!data) {
//                 return res.status(404).send({
//                     success: false,
//                     message: "Mcqs not found with id " + req.params.id
//                 });
//             }
//             res.send({
//                 success: true,
//                 data: data
//             });
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     success: false,
//                     message: "Mcqs not found with id " + req.params.id
//                 });
//             }
//             return res.status(500).send({
//                 success: false,
//                 message: "Error updating Mcqs with id " + req.params.id
//             });
//         });
// };

// function getImage(req, res) {
//     try {

//         let url_parts = url.parse(req.url, true);
//         // console.log (url.parse(req.url) + "naila")
//         let query = url_parts.query;
//         const path =`uploads/mcqs/${currentTime.getUTCFullYear()}/${query.image}`;
//         // console.log(query.image + "hello")

//         fs.readFile(path, function (err, data) {
//             if (err) throw err; // Fail if the file can't be read.
//             res.writeHead(200);
//             res.status(200).end(data); // Send the file data to the browser.
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

//Routes
// router.get('/', allMcqs_questions);
router.post('/create', [upload], CreateActivity);
// router.get('/getMcqs/:userId/:topicId/:typeId', getMcqsByTopic)
// router.get('/image', getImage)
// router.get('/:id', mcqs_details);
// router.put('/update/:id', mcqs_update);
// router.delete('/delete/:id', mcqs_delete);
module.exports = router;