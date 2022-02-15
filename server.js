// const express = require('express')
// const app = express()

// app.listen(3000, () => console.log('Server started'))
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./src/routes/users');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/register/user', users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
 
 
