const mongoose = require('mongoose');

const ageGroupSchema = new mongoose.Schema({
    age: {
        type: String,
        required: true
    },
    // topicId: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: "topic"
    // },
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: "user"
    // }
});

const AgeGroup = mongoose.model('AgeGroup', ageGroupSchema);
module.exports = AgeGroup;
