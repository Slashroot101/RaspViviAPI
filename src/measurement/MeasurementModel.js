const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
    environmentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    measurement: {
        humidity: {
            type: Number,
            required: true,
        },
        temperature: {
            type: Number,
            required: true,
        }
    },
    measured_on: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Measurement');