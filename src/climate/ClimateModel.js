const mongoose = require('mongoose');

const environmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  modelEnvironment: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    }
  },
});

module.exports = mongoose.model('Climate', environmentSchema);