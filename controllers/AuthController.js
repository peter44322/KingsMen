const User = require('../database/models/User');


exports.logout = function(req, res,next) {
  if (req.session) {
    var afterDestroy = function(err) {
      return err?next(err):res.redirect('/');
    };
    req.session.destroy(afterDestroy);
  }
};

exports.register = function(req, res,next) {
  res.render('register');
};

exports.login = function(req, res,next) {
  res.render('login');
};

exports.loginData = function(req, res,next) {
  User.authenticate(req.body.email , req.body.password ,(err,user,next)=>{
    if (err || !user) {
        req.flash('notify',{error:"Wrong credentials "});
        return res.redirect('back');
       }  else {
         console.log(user._id);
         req.session.userId = user._id;
         req.flash('notify',{success:"You are Logged in"});
         return res.redirect('/');
  }
});
};
