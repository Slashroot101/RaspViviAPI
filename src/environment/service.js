const {boomify} = require('boom');
const EnvironmentModel = require('./EnvironmentModel');

exports.create = async(req, reply) => {
  try {
    const environment = await new EnvironmentModel(req.body.environment).save();
    return {environment};
  } catch (err){
    throw boomify(err);
  }
};