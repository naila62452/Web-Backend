const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new mongoose.Schema({
    topic: { 
        type: String, 
        required: true 
   },
   userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user"
   },
   subId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "subject"
   },
//    langId: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "language"
//    },
   ageId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ageGroup"
   }
});
const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
