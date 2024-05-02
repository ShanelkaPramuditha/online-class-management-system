const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const mongoose = require('mongoose');
const router = require('./router');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = 'mongodb+srv://charuka_123:1197@cluster0.axzdown.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Conneted to MongoDB');  
    } catch (error) {
        console.log('MongoDB Error : ', error);
    }
};

connect();

app.listen(port, () => console.log(`Server started on port ${port}`));

app.use('/', router);
