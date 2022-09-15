const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repliesSchema = new Schema({
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

  likes: {
    type: [String],
  },
});

module.exports = {
  repliesSchema,
};
