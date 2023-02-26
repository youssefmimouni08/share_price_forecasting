const express = require("express");
const router = express.Router();
const History = require("../models/History");
const auth = require("../middleware/auth");
const User = require("../models/User");
router.post("/History", async (req, res) => {
  try {
    const history = new History({
      acteur: req.body.acteur,
      another_acteur: req.body.another_acteur,
      object: req.body.object,
      trigger_verb: req.body.trigger_verb,
      object_total_impact: req.body.object_total_impact,
      verb_total_impact: req.body.verb_total_impact,
    });
    await history.save();
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/myPredictions", auth, async (req, res) => {
  try {
    const myPredictions = await History.find({ user: req.user.id }).populate([
      {
        path: "user",
        model: User,
        select: "name email",
      },
    ]);

    if (!myPredictions) {
      return res
        .status(400)
        .json({ msg: "There is no predictions for this user" });
    }

    res.json(myPredictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/UpdatePrediction", auth, async (req, res) => {
  try {
    console.log(req.body.id);
    const myPrediction = await History.findOne({ _id: req.body.id }).populate([
      {
        path: "user",
        model: User,
        select: "name email",
      },
    ]);

    if (!myPrediction) {
      return res
        .status(400)
        .json({ msg: "There is no predictions for this user" });
    }
    myPrediction.real_impact = req.body.value;
    await myPrediction.save();
    res.json(myPrediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
