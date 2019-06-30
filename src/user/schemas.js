const userSchemaBeforeSave = {
    username: { type: 'string', },
    password: { type: 'string', },
    email: { type: 'string', },
    phoneNumber: { type:'string', },
    joinDate: { type: 'string', },
    accessibleEnvironments: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                environmentID: { type: 'string' },
                scope: {
                    type: 'string',
                    enum: ['Read', 'Write', 'Update', 'Delete'],
                }
            }
        }
    },
};

const userResponseObject = {
    ...userSchemaBeforeSave,
    joinDate: {type: 'string',},
    _id: {type: 'string', },
    __v:  {type: 'number'},
};

exports.login = {
    description: 'Create a user',
    tags: ['User'],
    summary: 'Logs a user in, if the credentials are correct',
    body: {
        email: { type: 'string', required: true, },
        password: { type: 'string', required: true,},
    },
    exposeRoute: true,
    response: {
        200: {
            description: 'Successfully created a new user',
            type: 'object',
            properties: {
                token: { type: 'string' },
            },
        },
        401: {
            description: 'The username or password is incorrect',
            type: 'object',
            properties:{
                msg: { type: 'string' },
            }
        }
    }
};

exports.createUser = {
    description: 'Create a user',
    tags: ['User'],
    summary: 'Creates a new user with the given values',
    body: {
        user: {
            type: 'object',
            properties: userResponseObject,
        }
    },
    exposeRoute: true,
    response: {
        200: {
            description: 'Successfully created a new user',
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: userResponseObject
                },
                token: {
                    type: 'string'
                }
            },
        }
    }
};