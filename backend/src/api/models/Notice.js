const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
    noticeID:{
        type: String,
        required:true,

    },
    topic:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    grade:{
        type:String,
        required:true,
    },
});

module.exports = Notice = mongoose.model("Notice",NoticeSchema);


