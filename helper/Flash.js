const expressFlash = require('express-flash');
exports.info = function( req , info) {
  req.flash('notify', {info:info});
}
exports.error = function( req , err) {
  req.flash('notify', {error:err});
}

exports.success = function( req , msg) {
  req.flash('notify', {success:msg});
}
