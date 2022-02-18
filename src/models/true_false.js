const { required } = require('joi');
const mongoose = require('mongoose');

const true_falseSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true
    },

        options: [
        {
            option: {
                type: Boolean,
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

const True_false = mongoose.model('true_false', true_falseSchema);
module.exports = True_false;
