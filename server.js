const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./src/routes/users');
const mcqsRoute = require('./src/routes/mcqs')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
app.use('/api/users', users);
app.use('/api/mcqs', mcqsRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


