// DEPENDENCIES
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a title.']
    },
    description: {
      type: String,
      required: [true, 'Please add a description.']
    },
    status: {
      type: String,
      enum: {
        values: ['not done', 'in progress', 'complete'],
        message: '{VALUE} is not a valid status.'
      },
      default: 'not done'
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'A task must belong to a project.']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please confirm your identity.']
    }
  },
  {
    timestamps: true
  }
);

const Task = new mongoose.model('Task', taskSchema);

module.exports = Task;