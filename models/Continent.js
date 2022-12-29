const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ContinentSchema = new mongoose.Schema({
  CODE: {
    type: String,
    required: true,
  },
  CONTINENT_NAME: String,
  REGIONS: [{ type: ObjectId, ref: "Region" }],
  VOISINS: [
    { ContinentID: { type: ObjectId, ref: "Continent" }, impact: String },
  ],
  oilProduction: String,
});
module.exports = mongoose.model("continent", ContinentSchema);
