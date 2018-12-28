const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const PostSchema = Schema({
    title: String,
    description: String,
    image: String,
    user : { type: Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
