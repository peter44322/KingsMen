var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;


var UserSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  
});

UserSchema.pre('save', function (next) {
  var user = this;
  user.password =  crypto.createHash('md5').update(user.password).digest('hex');
  next();
});

UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email }).exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        if (crypto.createHash('md5').update(password).digest('hex') === user.password) {
          return callback(null, user);
        } else {
          return callback();
        }
      });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
