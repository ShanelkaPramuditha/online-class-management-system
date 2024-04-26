const express = require("express");
const dbConnection =require("./config/db");
const routes = require("./routes/notices");
const cors =require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({origin: true,Credential:true}));


//console  display
//app.get("/", (req,res) => console.log("Hello Server is Running ..."));

//DB Connection
dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => res.send("Hello World"));
app.use("/api/notices",routes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
