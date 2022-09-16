const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  reaction: {
    type: String,
    required: true,
  },
});

module.exports = {
  reactionSchema,
};
