//DEPENDANCIES 
const mongoose = require('mongoose');

const connectionDB = () => {
    const db = mongoose.connect(process.env.MONGO_URI, {
        dbName: 'TaskMaster'
    });

    db.on('error',(error) => console.log(error.message + 'MongoDB is not running.'))
    db.on('connected', () => console.log(`Successfully connected to database: ${db.name}`))
    db.on('disconnected', () => console.log('Unable to connect to MongoDB. Please try again.'))
};

module.exports = connectionDB;