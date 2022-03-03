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

mongoose.connect('mongodb://localhost/')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
dotenv.config();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
app.use('/api/users', users);
app.use('/api/mcqs', mcqsRoute);
app.use('/api/true_false', tfRoute);
app.use('/api/students', students);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


