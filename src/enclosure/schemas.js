const enclosureBeforeSave = {
  name: {
    type: 'string',
  },
  climate: {
    type: 'string',
  },
  cameras: {
    type: 'array',
    items: {
      type: 'string',
    }
  }
};

const enclosureAfterSave = {
  ...enclosureBeforeSave,
  _id: {
    type: 'string',
  },
  __v: {
    type: 'number'
  },
};

exports.create = {
  description: 'Create an enclosure',
  tags: ['Enclosure'],
  summary: 'Creates a new enclosure',
  body: enclosureBeforeSave,
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created an enclosure',
      type: 'object',
      properties: {
        enclosure: {
          type: 'object',
          properties: enclosureAfterSave,
        }
      }
    }
  }
};

exports.update = {
  description: 'Update an enclosure',
  tags: ['Enclosure'],
  summary: 'Updates an enclosure',
};