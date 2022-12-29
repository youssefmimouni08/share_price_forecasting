const express = require("express");
const router = express.Router();
const Country = require("../models/Country");

router.get("/Countries", async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/Countries/:name", async (req, res) => {
  try {
    const country = await Country.findOne({
      COUNTRY_NAME: req.params.name,
    }).select("OilProduction -_id");
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/Country/borders/:name", async (req, res) => {
  try {
    const country = await Country.findOne({
      COUNTRY_NAME: req.params.name,
    })
      .select("OilProduction VOISINS -_id")
      .populate({
        path: "VOISINS.CountryID",
        model: Country,
        select: "COUNTRY_NAME OilProduction",
      });
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
