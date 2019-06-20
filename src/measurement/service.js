const { boomify } = require('boom');
const Measurement = require('MeasurementModel');

exports.create = async (req, reply) => {
    try {
        const measurement = await new Measurement(req.body.measurement).save().exec();
        return {measurement};
    } catch (err) {
        throw boomify(err);
    }
};

