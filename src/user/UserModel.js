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

UserModel.pre('save', (next) => {
    if(!this.isModified('password')) return next;

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

module.exports = mongoose.model('User', UserModel);