const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  lang: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

module.exports = {
  languageSchema,
};
