const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const User = require('./database/models/User');
const multer = require('multer');

const app = new express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'image' + '-' + Date.now())
  }
})

var upload = multer({ storage: storage})


const port = 8080;
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



app.get('/',  async (req, res)=>  {
  const posts = await Post.find({})
   res.render('index', {
       posts
   });
});


app.get('/posts/new', (req, res) => {
    res.render('create')
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/posts/store',upload.single('image'),  (req, res) => {
  var body = req.body
  body.image = req.file.filename;
  console.log(body);
  Post.create(body, (error, post) => {
     res.redirect('/')
 })
});

app.post('/user/store',  (req, res) => {

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


app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});

app.listen(port,function() {
  console.log('listening on '+port);
});
