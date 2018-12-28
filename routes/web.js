
var indexRouter = require('./index');
var AuthRouter = require('./auth');
var PostRouter = require('./posts');
var UserRouter = require('./users');

module.exports = function(app){
  app.use('/', indexRouter);
  app.use('/', AuthRouter);
  app.use('/posts', PostRouter);
  app.use('/users', UserRouter);
}
