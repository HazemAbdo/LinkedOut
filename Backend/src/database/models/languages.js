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

const Language = mongoose.model("Language", languageSchema);
module.exports = {
  Language,
  languageSchema,
};
