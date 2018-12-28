const Post = require('../database/models/Post');
const multer = require('multer');
const Flash = require('../helper/Flash');
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
  console.log(body);
  body.image = req.file.filename;
  Post.create(body, (error, post) => {
     res.redirect('/')
 });
}

exports.show = async function(req,res,next){
  const post = await Post.findById(req.params.id);
  //console.log(post);
  res.render('post', {post});
}

exports.update = function(req,res,next){
  var body = req.body
  console.log(body);
  if(req.file&&req.file.filename){
    body.image = req.file.filename;
  }
 Post.findByIdAndUpdate(body.post_id, {$set: body},function (err, product) {
        if (err) return next(err);
        Flash.success(req,body.title + ' Updated')
         res.redirect('/');
    });

}


exports.edit = async function(req,res){
  const post = await Post.findById(req.params.id);
  res.render('create', {post});
}
