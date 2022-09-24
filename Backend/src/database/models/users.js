const mongoose = require("mongoose");
const { certificateSchema } = require("./certificates");
const { connectionSchema } = require("./connections");
const { educationSchema } = require("./education");
const { experienceSchema } = require("./experience");
const { featuredSchema } = require("./featured");
const { jobPreferencesSchema } = require("./job_preferences");
const { languageSchema } = require("./languages");
const { projectSchema } = require("./projects");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  websites: {
    type: [String],
  },
  birthdate: {
    type: Date,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  current_position: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  profile_picture: {
    type: String,
  },
  skills: {
    type: [String],
  },
  connections: {
    type: [connectionSchema],
  },
  summary: {
    type: String,
  },
  address: {
    type: String,
  },
  languages: {
    type: [languageSchema],
  },
  job_preferences: {
    type: jobPreferencesSchema,
  },
  projects: {
    type: [projectSchema],
  },
  certificates: {
    type: [certificateSchema],
  },
  experience: {
    type: [experienceSchema],
  },
  education: {
    type: [educationSchema],
  },
  featured: {
    type: [featuredSchema],
  },
});

const User = mongoose.model("user", userSchema);
module.exports = {
  User,
  userSchema,
};
