const {boomify} = require('boom');
const EnclosureModel = require('./EnclosureModel');
const config = require('../../config');
exports.create = async (req, reply) => {
  try {
    const enclosure = await new EnclosureModel(req.body.enclosure).save();
    return {enclosure};
  } catch (err) {
    throw boomify(err);
  }
};

exports.update = async (req, reply) => {
  try {
    let query = {};

    if(req.body.enclosure.name){
      query.name = req.body.enclosure.name;
    }

    if(req.body.enclosure.climate){
      query.climate = req.body.enclosure.climate;
    }

    if(req.body.enclosure.cameras){
      query.$addToSet.cameras = req.body.enclosure.cameras;
    }

    if(req.body.enclosure.camerasToRemove){
      query.$pull.cameras = req.body.enclosure.camerasToRemove;
    }

    const enclosure = await EnclosureModel.findByIdAndUpdate(req.params.id, query, {new: true}).exec();
    return {enclosure};
  } catch (err){
    throw boomify(err);
  }
};

exports.delete = async (req, reply) => {
  try {
    const enclosure = await EnclosureModel.findByIdAndDelete(req.params.id).exec();
    if(enclosure.length === null){
      return reply
          .code(404)
          .send({
            message: 'The enclosure could not be found',
            code: 404,
          });
    }
    return {enclosure};
  } catch (err) {
    throw boomify(err);
  }
};

exports.getWithFilter = async (req, reply) => {
  try {
     let query = {};

     if(req.query.name){
       query.name = req.query.name;
     }

     if(req.query.ids){
       query.$in.id = req.query.ids;
     }

     if(req.query.climate){
       query.climate = req.query.climate;
     }

     const enclosures = await EnclosureModel.find(query).limit(req.query.limit ? req.query.limit : config.queryResultLimit).exec();
     return {enclosures};
  } catch (err) {
    throw boomify(err);
  }
};