const express = require("express");
const Country = require("../models/Country");
const router = express.Router();
const Region = require("../models/Region");

router.get("/Regions", async (req, res) => {
  try {
    const regions = await Region.find().populate([
      {
        path: "COUNTRIES",
        model: Country,
        select: "-REGION_NAME",
      },
      {
        path: "VOISINS.RegionID",
        model: Region,
      },
    ]);

    res.json(regions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
