const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const app = new express();

const port = 8080;


mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => console.log( 'You are now connected to Mongo!'))
    .catch(err => console.error('Something went wrong', err))

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

app.post('/posts/store', (req, res) => {
  Post.create(req.body, (error, post) => {
     res.redirect('/')
 })
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
