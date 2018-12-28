const Post = require('../database/models/Post');

exports.index =async function(req, res) {
  const  posts = await Post.find({});
   res.render('index', {
       posts
   });
};
