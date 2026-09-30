// DEPENDENCIES 
const mongoose = require('mongoose');

const connectionDB = () => {
    // 1. Kick off the connection
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'TaskMaster'
    });
    
    // 2. Assign the connection object to `db`
    const db = mongoose.connection;

    // 3. Attach your event listeners
    db.on('error', (error) => console.error(`${error.message} - MongoDB is not running.`));
    db.on('connected', () => console.log(`Successfully connected to database: ${db.name}`));
    db.on('disconnected', () => console.log('Unable to connect to MongoDB. Please try again.'));
};

module.exports = connectionDB;