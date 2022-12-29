const mongoose = require("mongoose");
const { Schema } = mongoose.model;
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "superUser", "admin"],
    default: "user",
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
