const environmentSchemaBeforeSave = {
  name: { type: 'string', description: 'The name of the climate'},
  createdOn: { type: 'string', description: 'The date that the climate was created on'},
  createdBy: { type: 'string', description: 'The user that created the climate'},
  modelEnvironment: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        x: { type: 'number', description: 'Longitude of climate that the weather is modeled from'},
        y: { type: 'number', description: 'Latitude of climate that the weather is modeled from' },
      }
    }
  }
};

const environmentResponseObject = {
  ...environmentSchemaBeforeSave,
  _id: {
    type: 'string',
  },
  __v: {
    type: 'number',
  }
};

exports.createEnvironment = {
  description: 'Create an climate',
  tags: ['Environment'],
  summary: 'Creates a new climate with the given values',
  body: environmentSchemaBeforeSave,
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created a new climate',
      type: 'object',
      properties: {
        environment: {
          type: 'object',
          properties: environmentResponseObject,
        }
      }
    }
  },
};

exports.updateEnvironment = {
  description: 'Updates an climate',
  tags: ['Environment'],
  summary: 'Updates an climate with the given values',
  body: environmentSchemaBeforeSave,
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully updated the climate',
      type: 'object',
      properties: {
        environment: {
          type: 'object',
          properties: environmentResponseObject,
        }
      }
    }
  },
};