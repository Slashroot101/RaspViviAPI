const measurementService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
    fastify.post('/', {schema: schema.createMeasurement}, measurementService.create);
    fastify.get('/', {schema: schema.getWithFilter}, measurementService.getWithFilter);
    next();
};