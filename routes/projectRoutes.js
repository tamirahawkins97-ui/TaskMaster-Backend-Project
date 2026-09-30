//DEPENDANCIES 
const express = reuquire('express');
const router = express.Router();
//I.N.D.U.C.E.S

//const { createNote } = require('../controllers/note-controllers');

// Authentication Middleware
const { verifyToken } = require('../middleware/auth-middleware');


//Index - All routes in this file must be protected by my authentication middleware. 


    // Get all projects owned by the currently logged-in user.
    //Get a single project by its ID. This must be protected by an ownership check—a user can only get a project they own.

//New - Generate a form for the creation of a new Product.  

//Delete - Delete a project. Also protected by an ownership check.

//Update - Update a project. Also protected by an ownership check.

//Create - Create a new project. The owner’s ID must be taken from the req.user object (provided by the auth middleware) and saved with the new project.

//Edit -

//Show -