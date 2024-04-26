const mongoose=require('mongoose');

const studentscheema = new mongoose.Schema({
    StudentID:{
        type: String,
        required:true,
    },

    Name:{
        type:String,
    },

    ClassName:{
        type:String,
        required:true,
    },
    
    Discription:{
        type:String,
        required:true,
    }


});

module.exports = student = mongoose.model("student",studentscheema);