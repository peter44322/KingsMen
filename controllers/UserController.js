const Post = require('../database/models/User');
const User = require('../database/models/User');

exports.store = function(req,res,next){
  if (req.body.email &&req.body.name &&req.body.password &&req.body.passwordConf) {
  var userData = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }
  User.create(userData, function (err, user) {
     res.redirect('/');
  });
}
}


exports.loggedIn = function(req,res){
   return User.findById(req.session.userId);
}
