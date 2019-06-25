const userService = require('./service');
const schema = require('./schemas');

module.exports = (fastify, options, next) => {
    fastify.post('/', {schema: schema.createUser}, userService.create);
    fastify.post('/login', {schema: schema.login}, userService.login);
    next();
};