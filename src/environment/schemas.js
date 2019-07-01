const environmentSchemaBeforeSave = {
  name: { type: 'string', description: 'The name of the environment'},
  createdOn: { type: 'string', description: 'The date that the environment was created on'},
  createdBy: { type: 'string', description: 'The user that created the environment'},
  modelEnvironment: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        x: { type: 'number', description: 'Longitude of environment that the weather is modeled from'},
        y: { type: 'number', description: 'Latitude of environment that the weather is modeled from' },
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
  description: 'Create an environment',
  tags: ['Environment'],
  summary: 'Creates a new environment with the given values',
  body: environmentSchemaBeforeSave,
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created a new environment',
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
  description: 'Updates an environment',
  tags: ['Environment'],
  summary: 'Updates an environment with the given values',
  body: environmentSchemaBeforeSave,
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully updated the environment',
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