const mongoose = require('mongoose');

const enclosureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  climate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Climate',
    required: true,
  },
  cameras: [String],
});

module.exports = mongoose.model('Enclosure', enclosureSchema);