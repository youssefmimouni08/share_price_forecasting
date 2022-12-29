const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const RegionSchema = new mongoose.Schema({
  REGION_NAME: {
    type: String,
    required: true,
  },
  CONTINENT_CODE: String,
  COUNTRIES: [{ type: ObjectId, ref: "Country" }],
  VOISINS: [{ RegionID: { type: ObjectId, ref: "Region" }, impact: String }],
  oilProduction: String,
});
module.exports = mongoose.model("region", RegionSchema);
