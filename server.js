//DEPENDANCIES 
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT

//Project Routes included here
const connectionDB = require('./db/connection')

//DATABASE CONNECTION 
//Mongoose/MongoDB Connection section
connectionDB();

//MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan("dev"));

//MOUNT ROUTES

//PORT
app.listen(PORT, (req,res) =>{
    console.log(`Server successfully connected to port: http://localhost:${PORT}`)
})