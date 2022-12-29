const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ProvinceSchema = new mongoose.Schema({
  CODE_PROVINCE: {
    type: String,
    required: true,
  },
  COUNTRY_CODE: String,
  PROVINCE_NAME: String,
  VOISINS: [
    { ProvinceID: { type: ObjectId, ref: "Province" }, impact: String },
  ],
  oilProduction: String,
});
module.exports = mongoose.model("province", ProvinceSchema);
