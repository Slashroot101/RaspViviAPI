const enclosureBeforeSave = {
  name: {
    type: 'string',
    description: 'Name of the enclosure'
  },
  climate: {
    type: 'string',
    description: 'Climate that the enclosure belongs in'
  },
  cameras: {
    type: 'array',
    items: {
      type: 'string',
      description: 'Cameras that belong inside of the enclosure'
    }
  }
};

const enclosureAfterSave = {
  ...enclosureBeforeSave,
  _id: {
    type: 'string',
    description: 'ID of the enclosure that was created'
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
  body: {
    name: {
      type: 'string',
      description: 'Name of the enclosure'
    },
    climate: {
      type: 'string',
      description: 'Climate that the enclosure belongs in'
    },
    cameras: {
      type: 'string',
      description: 'Array of cameras to add a camera to'
    },
    camerasToRemove: {
      type: 'string',
      description: 'Array of cameras to remove'
    },
  },
  params: {
    id: {
      type: 'string',
      description: 'ID of the enclosure to update'
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully updated an enclosure',
      type: 'object',
      properties: {
        enclosure: {
          type: 'object',
          properties: {
            enclosure: enclosureAfterSave
          }
        }
      }
    },
    404: {
      description: 'Enclosure could not be found',
      type: 'object',
      properties: {
        code: 404,
      }
    }
  }
};

exports.delete = {
  description: 'Delete an enclosure',
  tags: ['Enclosure'],
  summary: 'Deletes an enclosure',
  params: {
    id: {
      type: 'string',
      description: 'ID of enclosure to delete'
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully deleted the enclosure',
      type: 'object',
      properties: {
        enclosure: enclosureAfterSave,
      }
    },
    404: {
      description: 'The enclosure could not be found',
      type: 'object',
      properties: {
        code: 404,
      }
    }
  }
};

exports.getWithFilter = {
  description: 'Get a list of enclosures with a given filter',
  tags: ['Enclosure'],
  summary: 'Gets a list of enclosure based on a filter',
  query: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the enclosure(s) to get'
      },
      ids: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Ids of the enclosures to grab'
      },
      climate: {
        type: 'string',
        description: 'Enclosures with a specific climate to grab',
      }
    }
  },
  exposeRoutes: true,
  response: {
    200: {
      description: 'Successfully got all enclosures matching the filter',
      type: 'object',
      properties: {
        enclosures: {
          type: 'array',
          items: {
            type: 'object',
            properties: enclosureAfterSave
          }
        }
      }
    },
  }
};