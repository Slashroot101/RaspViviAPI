const fastify = require('fastify')({
    logger: true,
});
const swagger = require('./swagger');
const config = require('../config');
const mongoose = require('mongoose');
const rjwt = require('restify-jwt-community');

mongoose.connection.on('connected', () => {
    console.log('Connection Established')
});

mongoose.connection.on('reconnected', () => {
    console.log('Connection Reestablished')
});

mongoose.connection.on('disconnected', () => {
    console.log('Connection Disconnected')
});

mongoose.connection.on('close', () => {
    console.log('Connection Closed')
});

mongoose.connection.on('error', (error) => {
    console.log('ERROR: ' + error)
});


const start = async () => {
    try {
        mongoose.Promise = Promise;
        await mongoose.connect(config.db.connectionString, {
            useNewUrlParser: true,
        });
        mongoose.set('debug', true);
        fastify.register(require('fastify-swagger'), swagger.options);
        fastify.register(require('./measurement'), {prefix: '/api/measurement'});
        fastify.register(require('./user'), {prefix: '/api/user'});
        fastify.use(rjwt({secret: config.secretKey}).unless({
            path: ['/api/user/login'],
            useMongoClient: true,
        }));
        await fastify.listen(3000);
        fastify.swagger();
        fastify.log.info(`Server is listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}; 

start();