const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
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