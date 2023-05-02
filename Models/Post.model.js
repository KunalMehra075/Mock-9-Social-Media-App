const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    user: { type: mongoose.ObjectId, ref: 'User' },
    text: String,
    image: String,
    createdAt: { type: Date, default: new Date().toISOString() },
    likes: [{ type: mongoose.ObjectId, ref: 'User' }],
    comments: [{
        user: { type: mongoose.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: new Date().toISOString() }
    }]
})
const PostModel = mongoose.model("posts", PostSchema)

module.exports = PostModel;