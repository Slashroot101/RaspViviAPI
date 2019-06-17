exports.options = {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'Raspberry PI Vivarium API',
            description: 'An api to access metrics around your raspberry pi',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
};