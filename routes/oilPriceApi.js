const express = require("express");
const Country = require("../models/Country");
const router = express.Router();
const config = require("config");

router.get("/oilPrice", async (req, res) => {
  const token = config.get("oilPriceApiToken");
  try {
    let url = "https://api.oilpriceapi.com/v1/prices/latest";
    const headers = {
      Authorization: `Token  ${token}`,
      "Content-Type": "application/json",
    };

    fetch(url, { headers })
      .then((response) => response.json())
      .then((price) => res.json(price));

    //res.json(fetchPrice());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
