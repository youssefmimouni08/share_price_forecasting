const express = require("express");
const router = express.Router();
const Continent = require("../models/Continent");
const Region = require("../models/Region");
const Country = require("../models/Country");
const Province = require("../models/Province");

router.get("/Continents", async (req, res) => {
  try {
    const continents = await Continent.find().populate([
      {
        path: "REGIONS",
        model: Region,
        populate: {
          path: "COUNTRIES",
          model: Country,
          select: "-REGION_NAME",
          populate: {
            path: "PROVINCES",
            model: Province,
          },
        },
      },
      { path: "VOISINS.ContinentID", model: Continent },
    ]);
    res.json(continents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  /*Continent.find()
      .lean()
      .populate({
        path: "REGIONS",
        model: Region,
      })
      .exec(function (err, regions) {
        var countries = {
          path: "REGIONS.COUNTRIES",
          model: Country,
        };

        if (err) return res.json(500);
        Continent.populate(regions, countries, function (err, continents) {
          res.json(continents);
        });
      });*/
});
module.exports = router;
