"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  estimatedTime: String,
  materialsNeeded: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews"
    }
  ],
  steps: [
    {
      stepNumber: Number,
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
});

const Courses = mongoose.model("courses", CoursesSchema);
module.exports = Courses;