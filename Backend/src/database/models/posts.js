const mongoose = require("mongoose");
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
  comments_count: {
    type: Number,
    default: 0,
  },
  shares_count: {
    type: Number,
  },
  reactions_count: {
    type: Number,
  },
  shares: {
    type: [sharesSchema],
  },
  created_from: {
    type: Object,
  },
  reaction_types: {
    type: Array,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = {
  Post,
  postSchema,
};
