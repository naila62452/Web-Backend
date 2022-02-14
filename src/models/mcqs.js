const { required } = require('joi');
const mongoose = require('mongoose');

const mcqsSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true
    },
    // options: {
    //     type: []
       
    // }
    
    options: [
        {
            option: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

const Mcqs = mongoose.model('MCQS', mcqsSchema);
module.exports = Mcqs;
