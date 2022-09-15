const mongoose = require("mongoose");
const { commentsSchema } = require("./comments");
const { sharesSchema } = require("./shares");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  date_posted: {
    type: Date,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: [String],
  },
  comments: {
    type: [commentsSchema],
  },
  shares: {
    type: [sharesSchema],
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = {
  Post,
  postSchema,
};
