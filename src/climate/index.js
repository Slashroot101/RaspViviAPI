const environmentService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
  fastify.post('/', {schema: schema.createEnvironment}, environmentService.create);
  fastify.put('/:id', {schema: schema.updateEnvironment}, environmentService.update);
  next();
};