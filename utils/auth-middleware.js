//DEPENDANCIES 
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Access denined. Please login to confirm your identity.'});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  //Contains _id and role from when you signed the token
        next();
    } catch (error) {
        return res.status(403).json({message: 'Invalid or expired token.'})
    }
};

module.exports = verifyToken;