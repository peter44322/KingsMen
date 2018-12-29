const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const mongoose = require('mongoose');
const expressEdge = require('express-edge');
const bodyParser = require('body-parser');
const NotifyMiddleware = require('./middleware/notify');
module.exports = function(app,express){
  var sessionStore = new session.MemoryStore;
  var uri = process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI;

  app.use(cookieParser('secretString'));
  app.use(session({
      cookie: { maxAge: 60000 },
      store: sessionStore,
      saveUninitialized: true,
      resave: 'true',
      secret: 'secret'
  }));
  app.use(flash());


  mongoose.connect( uri || 'mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
      .then(() => console.log( 'You are now connected to Mongo!'))
      .catch(err => console.error('Something went wrong', err));

  app.use(express.static('public'));
  app.use(expressEdge);
  app.set('views', __dirname + '/views');
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
      extended: true
  }));

  //middleware
  app.use(NotifyMiddleware.subscribe);
}
