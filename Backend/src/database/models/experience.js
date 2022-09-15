const mongoose = require("mongoose");
const { featuredSchema } = require("./featured");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
  industry: {
    type: String,
  },
  description: {
    type: String,
  },
  profile_headline: {
    type: String,
  },
  skills: {
    type: [String],
  },
  media: {
    type: [featuredSchema],
  },
});

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = {
  Experience,
  experienceSchema,
};
