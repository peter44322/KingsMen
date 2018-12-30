const Post = require('../database/models/Post');

exports.index =async function(req, res) {
  if(req.query.q){
    var  posts = await Post.find({title: req.query.q}).populate('user');
  }else {
    var  posts = await Post.find({}).populate('user');
  }



  String.prototype.trunc = String.prototype.trunc ||
        function(n){
            return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
    };

   res.render('index', {
       posts
   });
};

exports.about = function (req,res) {
  res.render('about');
}
