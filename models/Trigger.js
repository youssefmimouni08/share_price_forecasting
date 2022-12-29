const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const TriggerSchema = new mongoose.Schema({
  trigger: String,
  weight: Number,
  suggested_weights: [],
  event_type: { type: ObjectId, ref: "EventType" },
});

module.exports = mongoose.model("trigger", TriggerSchema);
