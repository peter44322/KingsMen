var mongoose = require('mongoose');
var crypto = require('crypto');
var UserSchema = new mongoose.Schema({
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
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  user.password =  crypto.createHash('md5').update(user.password).digest('hex');
  next();
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
