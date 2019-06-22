const MeasurementObject = {
    environmentID: {
        type: 'String'
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
    _v: {
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

};