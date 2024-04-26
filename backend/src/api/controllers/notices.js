const express = require("express");

const router = express.Router();

const Notices = require("../models/Notice");

//test

router.get("/test",(req,res) =>res.send("Notice routes is working"));

//insert
router.post("/",(req,res)=>{
    Notices.create(req.body).then(()=>res.json({msg:"Notice added sucsesfully"}))
    .catch((error)=>res.status(400).json({msg:"notice adding faild", error}));
})

//get
router.get("/",(req,res)=>{
    Notices.find().then((Notices)=>res.json(Notices))
    .catch((err)=>res.status(400).json({msg: "No Notice found"}));
});
//get only one data
router.get("/:id",(req,res)=>{
    Notices.findById(req.params.id).then((Notices)=>res.json(Notices))
    .catch(()=>res.status(400).json({msg: "cannot find the notice"}));
});

//put

router.put("/:id",(req,res)=>{
    Notices.findByIdAndUpdate(req.params.id,req.body).then(()=>res.json({msg:"Notise udate successfuly"}))
    .catch(()=>res.status(400).json({msg: "Notice update faild"}));
});

//Delete

router.delete("/:id",(req,res)=>{
    Notices.findByIdAndDelete(req.params.id).then(()=>res.json({msg: "Notice Delted Successfuly"}))
    .catch(()=>res.status(400).json({msg:" this notice Cannot be deleted"}));
});
module.exports = router;
