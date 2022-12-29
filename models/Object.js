const mongoose = require("mongoose");
const ObjectSchema = new mongoose.Schema({
  object: String,
  weight: Number,
  suggested_weights: [],
});

module.exports = mongoose.model("object", ObjectSchema);
