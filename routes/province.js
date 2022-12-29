const express = require("express");
const router = express.Router();
const Province = require("../models/Province");

router.get("/Provinces", async (req, res) => {
  try {
    const provinces = await Province.find();
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
