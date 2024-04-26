const express =require("express");
const dbConnection=require("./config/db");
const routes= require("./routes/students");
const cors = require("cors");
const bodyParser = require("body-parser");

const app= express();
app.use(cors({origin:true,Credential:true}));


//db connection
dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) => res.send("Hello sever world"));
app.use("/api/students",routes);

const PORT = 3000;

app.listen(PORT,()=> console.log(`sever running on port ${PORT}`));