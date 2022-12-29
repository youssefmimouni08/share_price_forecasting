const express = require("express");
const router = express.Router();
const Region = require("../models/Region");

router.get("/Regions", async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
