//DEPENDANCIES 
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    user:
    {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User',
     required: [true, 'Please confirm your identity.']
    },
    name:
    {type: String, required: true, trim: true},
    description:{type: String, required: true},
},
{
    timestamps:true
});

const Task = new mongoose.model('Project', projectSchema);

module.exports = Task;