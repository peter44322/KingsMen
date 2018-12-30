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
    Flash.success( req,' Created successfully!');
     res.redirect('/posts/'+post._id)
 });
}

exports.show =  function(req,res,next){
    Post.findById(req.params.id,function (err,post) {
    if (err) {
      Flash.error(req,'Post Not Found')
      return res.redirect('/');
    }
      return res.render('post', {post});
   });
}
exports.delete =  function(req,res,next){
   Post.findByIdAndRemove(req.params.id, function (err) {
        if (err){
          Flash.error(req,'Cannot Delete');
          return res.redirect('/');
        }
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
   if (err){
     Flash.error(req,'Cannot Update');
     return res.redirect('/');
   }
        Flash.success(req,body.title + ' Updated')
         res.redirect('/');
    });

}


exports.edit = async function(req,res){
  const post = await Post.findById(req.params.id);
  res.render('create', {post});
}
