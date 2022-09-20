const mongoose = require("mongoose");
const { featuredSchema } = require("./featured");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  school_name: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  field_of_study: {
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
  grade: {
    type: String,
  },
  activities_and_societies: {
    type: [String],
  },
  description: {
    type: String,
  },
  media: {
    type: [featuredSchema],
  },
});

module.exports = {
  educationSchema,
};
