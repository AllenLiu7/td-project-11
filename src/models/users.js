"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//authenticate input against database documents
UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ emailAddress: email }).exec((error, user) => {
    if (error) {
      return callback(error);
    } else if (!user) {
      let err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (result) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

UserSchema.pre("save", function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
