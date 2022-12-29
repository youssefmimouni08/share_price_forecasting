const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const CountrySchema = new mongoose.Schema({
  CODE_COUNTRY: {
    type: String,
    required: true,
  },
  COUNTRY_NAME: String,
  REGION_NAME: String,
  PROVINCES: [{ type: ObjectId, ref: "Province" }],
  VOISINS: [{ CountryID: { type: ObjectId, ref: "Country" }, impact: String }],
  oilProduction: String,
});
module.exports = mongoose.model("country", CountrySchema);
