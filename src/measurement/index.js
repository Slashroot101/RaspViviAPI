const measurementService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
    fastify.post('/', {schema: schema.createMeasurement}, measurementService.create);

    next();
};