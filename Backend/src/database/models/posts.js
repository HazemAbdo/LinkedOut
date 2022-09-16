const mongoose = require("mongoose");
const { commentsSchema } = require("./comments");
const { reactionSchema } = require("./reactions");
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
  reactions: {
    type: [reactionSchema],
  },
  comments: {
    type: [commentsSchema],
  },
  shares: {
    type: [sharesSchema],
  },
  created_from: {
    type: Object,
  },
  user: {
    type: Object,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = {
  Post,
  postSchema,
};
