const express= require("express");

const router=express.Router();

const students=require("../models/student");

router.get("/test",(req,res)=>res.send("Student routes Working"));

router.post("/",(req,res)=>{
    students.create(req.body)
    .then(()=>res.json({msg:"Student added succesfully"}))
    .catch(()=>res.status(400).json({msg:"Student adding faild"}));
})
router.get("/",(req,res)=>{
    students.find().then((students)=>res.json(students)).catch((err)=>res.status(400).json({msg:"No student found"}));

});

router.get("/:id",(req,res)=>{
    students.findById(req.params.id).then((students)=>res.json(students))
    .catch(()=>res.status(400).json({msg:"cannot find this review"}));
});

router.put("/:id",(req,res)=>{
    students.findByIdAndUpdate(req.params.id,req.body).then(()=>res.json({msg:"Update Successfull"})).catch(() =>res.status(400).json({msg:"Update failed"}));
});

router.delete("/:id",(req,res)=>{
    students.findByIdAndDelete(req.params.id).then(()=>res
    .json({msg:"Deleted sucesfully"})
    );
});

module.exports = router;