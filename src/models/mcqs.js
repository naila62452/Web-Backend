const mongoose = require('mongoose');

const mcqsSchema = new mongoose.Schema({
    mcqs: { 
        type: String, 
        required: true 
   },    
   option1: { 
        type: String, 
        required: true 
   },
   option2: { 
       type: String, 
       required: true 
   },
   option3: { 
       type: String, 
       required: true 
   },
   option4: { 
       type: String, 
       required: true 
   },
   answer: { 
       type: String, 
       required: true 
   }
});
    // question: {
    //     type: String,
    //     required: true
    // },
    // options: [
    //     {
    //         option: {
    //             type: String,
    //             required: true
    //         },
    //         isCorrect: {
    //             type: Boolean,
    //             required: true,
    //             default: false
    //         }
    //     }
    // ]
// })

const Mcqs = mongoose.model('MCQS', mcqsSchema);
module.exports = Mcqs;
