//DEPENDANCIES 
const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require("morgan");
const PORT = process.env.PORT || 1221;

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
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/projects/:projectId/tasks', taskRoutes);
app.use('/api/tasks', taskRoutes.taskItemRouter);
//PORT
app.listen(PORT, () =>{
    console.log(`Server successfully connected to port: http://localhost:${PORT}`)
})