const flash = require('express-flash');

exports.subscribe = function(req, res, next){
  res.locals.notify =req.flash('notify')[0];
  next();
}
