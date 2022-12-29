const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const HistorySchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    forecast_object: {},
    real_impact: String,
  },

  { timestamps: true }
);
module.exports = mongoose.model("history", HistorySchema);
