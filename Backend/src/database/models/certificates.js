const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
  certificate_name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  issue_date: {
    type: Date,
    required: true,
  },
  expired: {
    type: Boolean,
  },
  expiration_date: {
    type: Date,
  },
  credential_id: {
    type: String,
  },
  credential_url: {
    type: String,
  },
});

const Certificate = mongoose.model("Certificate", certificateSchema);
module.exports = {
  Certificate,
  certificateSchema,
};
