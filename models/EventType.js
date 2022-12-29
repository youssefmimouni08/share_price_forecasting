const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const EventTypeSchema = new mongoose.Schema({
  event: String,
  questionTemplate: [{ argumentRole: String, question: String }],
});
module.exports = mongoose.model("eventType", EventTypeSchema);
