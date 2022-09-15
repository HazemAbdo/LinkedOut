const mongoose = require("mongoose");
const { repliesSchema } = require("./replies");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  date_commented: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  replies: {
    type: [repliesSchema],
  },
  likes: {
    type: [String],
  },
});

module.exports = {
  commentsSchema,
};
