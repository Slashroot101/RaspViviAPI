const MeasurementObject = {
    environmentID: {
        type: 'string'
    },
    measurement: {
        type: 'object',
        properties: {
            humidity: {
                type: 'number'
            },
            temperature: {
                type: 'number'
            }
        }
    },
    measuredOn: {
        type: 'string'
    }
};

const MeasurementResponseObject = {
    ...MeasurementObject,
    _id: {
        type: 'string'
    },
    __v: {
        type: 'number'
    },
};

exports.createMeasurement = {
    description: 'Create a measurement',
    tags: ['Measurement'],
    summary: 'Creates a new measurement with the given values',
    body: MeasurementObject,
    exposeRoute: true,
    response: {
        200: {
            description: 'Successfully created a new measurement',
            type: 'object',
            properties: {
                measurement: {
                    type: 'object',
                    properties: MeasurementResponseObject
                }
            },
        }
    }
};

exports.getWithFilter = {
    description: 'Get measurements with a filter',
    tags: ['Measurement'],
    summary: 'Gets all measurements for a given query string',
    query: {
        measuredOn: { type: 'string', description: 'The date that the measurement was taken on.'},
        measuredOnEndDate: { type: 'string', description: 'The date that the measurements should stop on'},
        environmentID: { type: 'string', description: 'The environment to query for the given measurements in'},
    },
    exposeRoute: true,
    response: {
        200: {
            description: 'Successfully grabbed all measurements',
            type: 'object',
            properties: {
                measurement: {
                    type: 'array',
                    items: { properties: MeasurementResponseObject }
                }
            },
        }
    }
};