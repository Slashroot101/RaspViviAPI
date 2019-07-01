const {boomify} = require('boom');
const EnvironmentModel = require('./ClimateModel');

exports.create = async(req, reply) => {
  try {
    const environment = await new EnvironmentModel(req.body.environment).save();
    return {environment};
  } catch (err){
    throw boomify(err);
  }
};

exports.update = async(req, reply) => {
  try {
    let query = {};
    if(req.body.environment.name){
      query.name = req.body.environment.name;
    }

    if(req.body.environment.modelEnvironment.x){
      query.modelEnvironment.x = req.body.environment.modelEnvironment.x;
    }

    if(req.body.environment.modelEnvironment.y){
      query.modelEnvironment.y = req.body.environment.modelEnvironment.y;
    }

    const environment = await EnvironmentModel.findByIdAndUpdate(req.params.id, query, {new: true}).exec();
    return {environment};
  } catch (err){
    throw boomify(err);
  }
};