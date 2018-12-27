const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const User = require('./database/models/User');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var flash = require('express-flash');

const app = new express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'image' + '-' + Date.now())
  }
});
//app.use(session({secret: 'your secret', saveUninitialized: true, resave: false}));

var upload = multer({ storage: storage});
var sessionStore = new session.MemoryStore;

app.use(cookieParser('secretString'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    req.flash('notify', {info:'You must Login To Make that Action.'});

    return res.redirect('/login');
  }
}

function requiresLogout(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  } else {
    return next();
  }
}

const port =process.env.PORT || 8080 ;
var uri = process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI;

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




app.use(function (req, res, next) {
  res.locals.notify =req.flash('notify')[0];
  console.log(req.flash('notify')[0]);
  next();
});

app.get('/' ,async (req, res)=>  {
  const posts = await Post.find({});
   res.render('index', {
       posts
   });
});

app.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
app.get('/posts/new',requiresLogin, (req, res) => {
    res.render('create')
});

app.get('/register',requiresLogout, (req, res) => {
    res.render('register')
});

app.get('/login',requiresLogout, (req, res) => {
    res.render('login')
});

app.post('/posts/store',requiresLogin,upload.single('image'),  (req, res) => {
  var body = req.body
  body.image = req.file.filename;
  console.log(body);
  Post.create(body, (error, post) => {
     res.redirect('/')
 })
});

app.post('/user/store',requiresLogout,  (req, res) => {

  if (req.body.email &&
  req.body.name &&
  req.body.password &&
  req.body.passwordConf) {
  var userData = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }
  //use schema.create to insert data into the db
  User.create(userData, function (err, user) {
     res.redirect('/');
  });
}
});

app.post('/login',requiresLogout, (req, res) => {
  User.authenticate(req.body.email , req.body.password ,(err,user,next)=>{
    if (err || !user) {
        req.flash('notify',{error:"Wrong credentials "});
        return res.redirect('back');
       }  else {
         console.log(user._id);
         req.session.userId = user._id;
         req.flash('notify',{success:"You are Loged in"});
         return res.redirect('/');
  }
});
});


app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});

app.listen(port,function() {
  console.log('listening on '+port);
});
