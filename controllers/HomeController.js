const Post = require('../database/models/Post');

exports.index =async function(req, res) {
  const  posts = await Post.find({}).populate('user');
   res.render('index', {
       posts
   });
};
