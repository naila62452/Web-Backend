const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const open_endedSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    topicId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "topic"
    }
})

const Open_Ended = mongoose.model('Open_ended', open_endedSchema);
module.exports = Open_Ended;
