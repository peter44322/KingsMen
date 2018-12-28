const Post = require('../database/models/Post');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, 'image' + '-' + Date.now())
  }
});

exports.upload = multer({ storage: storage});

exports.create = function(req,res){
  res.render('create');
}

exports.store = function(req,res,next){
  var body = req.body
  body.image = req.file.filename;
  Post.create(body, (error, post) => {
     res.redirect('/')
 });
}

exports.show = async function(req,res,next){
  const post = await Post.findById(req.params.id);
  console.log(post);
  res.render('post', {
      post
  })
}
