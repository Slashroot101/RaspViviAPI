const { boomify } = require('boom');
const UserModel = require('./UserModel');
const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.create = async (req, reply) => {
    try {
        const user = await new UserModel(req.body.user).save();
        return {user, token: jwt.sign({id: user._id}, config.secretKey, {expiresIn: '1h'})};
    } catch (err) {
        throw boomify(err);
    }
};

exports.login = async(req, reply) => {
    try {
        const isValidUser = await UserModel.authenticate(req.body.email, req.body.password);
        if(isValidUser.isValid){
            return {token: jwt.sign({id: isValidUser.user._id}, config.secretKey, {expiresIn: '1h'})};
        } else {
            return reply.code(401).send({msg: 'The username or password is incorrect'});
        }
    } catch (err) {
        console.log(err)
        throw boomify(err);
    }
};