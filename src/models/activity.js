const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new mongoose.Schema({
    intro: { 
        type: String
         
   },    
   video_url: { 
        type: String
   },
   img: {
        type: []
    },
   audio: { 

    type: []
     
   },
   question: { 
       type: String, 
       required: true,
       },

       statement1:{
        type: String, 
        required: true
    },

        answer1:{
            type: String, 
            required: true
        },

       statement2:{
        type: String, 
        required: true 
    },

        answer2:{
            type: String, 
            required: true
        },

    
       statement3:{
        type: String, 
        required: true
    },

        answer3:{
            type: String, 
            required: true
        },

       statement4:{
        type: String, 
        required: true
    },

        answer4:{
            type: String, 
            required: true
        
       },
       statement5:{
        type: String, 
        required: true

       },
       statement6:{
        type: String, 
        required: true

       },
       statement7:{
        type: String, 
        required: true

       },
       statement8:{
        type: String, 
        required: true
       }
   
//    userId: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "user"
//    },
//    topicId:{
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "topic"
//    },
//    typeId:{
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "type"
//    }
//    ,
//    subId: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "subject"
//    }
});

const Acitvity = mongoose.model('ACTIVITY', activitySchema);
module.exports = Acitvity;
