const Post = require('../database/models/Post');
const multer = require('multer');
const Flash = require('../helper/Flash');
const UserController = require('./UserController');
const User = require('../database/models/User');
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

exports.show =  function(req,res,next){
    Post.findById(req.params.id,function (err,post) {
    //  var c = User.findById(req.session.userId).isMyPost(post);
      // var dog = new User({ _id: req.session.userId });
      // console.log(dog.isMyPost(post._id));
      res.render('post', {post});
   });
}
exports.delete =  function(req,res,next){
   Post.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        Flash.success( req,' Deleted successfully!');
        res.redirect('/');
    })
}
exports.update = function(req,res,next){
  var body = req.body
//  console.log(body);
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
