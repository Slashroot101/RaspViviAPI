const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../../config');

const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    joinDate: {
        type: Date,
        required: false,
    },
    accessibleEnvironments: [{
        environmentID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Environment'
        },
        scope: [{
            type: String,
            enum: ['Read', 'Write', 'Update', 'Delete']
        }]
    }],
});

UserModel.pre('save', function (next){
    if(!this.isModified('password')) return next;
    this.joinDate = new Date();
    bcrypt.genSalt(config.saltFactor, (err, salt) => {
        if(err) return next(err);

        bcrypt.hash(this.password, salt, (hashErr, hash) => {
            if(hashErr) return next(hashErr);

            this.password = hash;
            next();
        });
    });
});

UserModel.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserModel.statics.authenticate = async (email, password) => {
  const user = await User.findOne({email}).exec();
  if(!user){
      return {
          isValid: false,
          user: {}
      }
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  return {
      isValid: isValidPassword,
      user
  }
};

const User =  mongoose.model('User', UserModel);

module.exports = User;