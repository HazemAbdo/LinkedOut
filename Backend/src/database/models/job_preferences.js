const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobPreferencesSchema = new Schema({
  job_titles: {
    type: [String],
  },
  work_places: {
    type: [String],
  },
  job_locations_on_site: {
    type: [String],
  },
  job_locations_remote: {
    type: [String],
  },
  job_types: {
    type: [String],
  },
  start_date: {
    type: String,
  },
  view: {
    type: String,
  },
});

module.exports = {
  jobPreferencesSchema,
};
