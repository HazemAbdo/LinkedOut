const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invalidTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

const InvalidToken = mongoose.model("InvalidToken", invalidTokenSchema);
module.exports = {
  InvalidToken,
  invalidTokenSchema,
};
