const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sharesSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  date_shared: {
    type: Date,
    required: true,
  },
  body: {
    type: String,
  },
});

module.exports = {
  sharesSchema,
};
