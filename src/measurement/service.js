const { boomify } = require('boom');
const Measurement = require('./MeasurementModel');

exports.create = async (req, reply) => {
    try {
        const measurement = await new Measurement(req.body.measurement).save();
        return {measurement};
    } catch (err) {
        throw boomify(err);
    }
};


exports.getWithFilter = async (req, reply) => {
    try {
        let query = {};

        if(req.query.measuredOn){
            query.measuredOn['$gt'] = req.query.measuredOn;
        }

        if(req.query.measuredOnEndDate){
            query.measuredOn['$lt'] = req.query.measuredOnEndDate;
        }

        if(req.query.environmentID){
            query.environmentID = req.query.environmentID;
        }

        const measurements = await Measurement.find(query).limit(req.query.limit ? req.query.limit : 0).sort({measuredOn: req.query.sort ? req.query.sort : 0});
        return {measurements};
    } catch (err){
        throw boomify(err);
    }
};

