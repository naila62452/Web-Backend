const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const students = require('./src/routes/student');
const users = require('./src/routes/users');
const mcqsRoute = require('./src/routes/mcqs');
const tfRoute = require('./src/routes/true_false');
const topicRoute = require('./src/routes/topic');
const subjectRoutes = require('./src/routes/subject');
const imageRoute = require('./src/routes/image');
const questionTypeRoute = require('./src/routes/question_category');
const ageGroupRoute = require('./src/routes/ageGroup');
const languageRoute = require('./src/routes/language');
const activityRoute = require('./src/routes/activity');
const bodyParser= require('body-parser');

//mongoose.connect('mongodb://localhost/')
mongoose.connect('mongodb+srv://alizain:alpha786@cluster0.vw63h.mongodb.net/test')

    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
dotenv.config();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", " x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// Set EJS as templating engine 
app.set("view engine", "ejs");


app.use('/api/users', users);
app.use('/api/mcqs', mcqsRoute);
app.use('/api/true_false', tfRoute);
app.use('/api/students', students);
app.use('/api/topic', topicRoute);
app.use('/api/subject', subjectRoutes);
app.use('/api/image', imageRoute);
app.use('/api/type', questionTypeRoute);
app.use('/api/age', ageGroupRoute);
app.use('/api/language', languageRoute);
app.use('/api/activity', activityRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


