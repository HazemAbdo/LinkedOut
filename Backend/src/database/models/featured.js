const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const featuredSchema = new Schema({
  url_link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Featured = mongoose.model("Featured", featuredSchema);
module.exports = {
  Featured,
  featuredSchema,
};
