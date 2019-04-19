"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  fullName: String,
  emailAddress: String,
  password: String
});

//authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ emailAddress: email }).exec(function(error, user) {
    if (error) {
      return callback(error);
    } else if (!user) {
      let err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }

    bcrypt.compare(password, user.password, function(error, result) {
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
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
