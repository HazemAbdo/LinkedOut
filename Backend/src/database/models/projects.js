const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  project_name: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
    required: true,
  },
  project_link: {
    type: String,
    required: true,
  },
  currently_working: {
    type: Boolean,
  },
  project_start_date: {
    type: Date,
    required: true,
  },
  project_end_date: {
    type: Date,
  },
  creators: {
    type: [String],
  },
  asscoiated_with: {
    type: String,
  },
  asscoiated_skills: {
    type: [String],
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = {
  Project,
  projectSchema,
};
