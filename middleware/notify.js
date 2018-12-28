const flash = require('express-flash');
const User = require('../database/models/User');

exports.subscribe = async function(req, res, next){
  res.locals.notify =req.flash('notify')[0];
  const user = await User.findById(req.session.userId);
  res.locals.user = req.session.userId ? user: null ;
  next();
}
