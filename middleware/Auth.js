const flash = require('express-flash');

exports.requiresLogin = function(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    req.flash('notify', {info:'You must Login To Make that Action.'});

    return res.redirect('/login');
  }
}

exports.requiresLogout = function(req, res, next) {
  if (req.session && req.session.userId) {
    req.flash('notify', {info:'You already Logged In'});
    return res.redirect('/');
  } else {
    return next();
  }
}
