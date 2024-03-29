const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
  }
);

const Post = mongoose.model('posts', postSchema);

exports.createPost = (obj, next) => {
    const post = new Post(obj);

    post.save(function(err, post) {
        next(err, post)
    }) 
}

exports.updatePost = (postId, updateData, next) => {
    Post.findByIdAndUpdate(postId, updateData, { new: true }, (err, updatedPost) => {
        next(err, updatedPost);
    });
};

exports.findPost = (obj, next) => {
    Post.findById(obj.id, function(err, post){
        next(err, post)
    })
}