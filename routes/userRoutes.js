//DEPENDANCIES 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const JWT_SECRET = process.env.JWT_SECRET
//I.N.D.U.C.E.S

//Index - Read all projects with Advanced Querying.

//New

//Delete -

//Update -

//Create - POST /api/users/register
 //ensure the password gets hased by the model's presaved hook. 
router.post('/register', async(req,res) =>{
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser){
            return res.status(400).json ({error: 'A user with that email already exists. Please try again.'})
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({userResponse})
    } catch (error){
        return res.status(500).json({ error: error.message })
    }
});

//Create - POST /api/users/login
    //find a user by their email, compare the provided password with the stored hash, and, if successful, generate and return a signed JSON Web Token (JWT).
router.post('/login', async (req,res) => {
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({error: 'Incorrect email or password.'});
        }

        const isMatch = await user.isCorrectPassword(password)

        if(!isMatch){
            return res.status(400).json({error:'Incorrect email or password. Please try again.'})
        }

        const payload = {
            _id: user._id,
            username: user.username,
        }

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2d'}); 

        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({ token, user: userData });

    } catch(error) {
        return res.status(500).json({ error: error.message })
    }
});

//Edit -

//Show -

module.exports = router;