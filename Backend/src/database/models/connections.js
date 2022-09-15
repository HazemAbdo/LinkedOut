const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  connection_status: {
    type: String,
    required: true,
  },
});

const connectionModel = mongoose.model("Connection", connectionSchema);
module.exports = {
  connectionModel,
  connectionSchema,
};
