const express = require("express");
const router = express.Router();
const Object = require("../models/Object");

router.get("/Objects", async (req, res) => {
  try {
    const objects = await Object.find();
    res.json(objects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/Objects/:noun", async (req, res) => {
  try {
    const object = await Object.findOne({
      object: req.params.noun,
    }).select("weight -_id");
    res.json(object);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/Objects/", async (req, res) => {
  const { obj_name, obj_weight } = req.body;
  try {
    let obj = await Object.findOne({
      object: obj_name,
    });
    if (!obj) {
      obj = new Object({
        object: obj_name,
        weight: obj_weight,
        suggested_weights: [obj_weight],
      });
      await obj.save();
      return res.json(obj);
    }
    if (!obj["suggested_weights"].includes(obj_weight)) {
      obj["suggested_weights"] = [...obj["suggested_weights"], obj_weight];
    }
    sum = 0;
    obj.suggested_weights.map((o) => {
      sum = sum + parseFloat(o);
    });
    median_weight = sum / obj.suggested_weights.length;

    obj.weight = median_weight.toFixed(4);
    await obj.save();
    res.json(obj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/*router.put("/Objects", async (req, res) => {
  obj_id = [
    "6352c7c33893090108bb545a",
    "6352c7c33893090108bb545b",
    "6352c7c33893090108bb545c",
    "6352c7c33893090108bb545d",
    "6352c7c33893090108bb545e",
    "6352c7c33893090108bb545f",
    "6352c7c33893090108bb5460",
    "6352c7c33893090108bb5461",
    "6352c7c33893090108bb5462",
    "6352c7c33893090108bb5463",
    "6352c7c33893090108bb5464",
    "6352c7c33893090108bb5465",
  ];
  try {
    for (o of obj_id) {
      a = -100;
      b = 100;
      var w = Math.floor(Math.random() * (b - a) + a);

      let object = await Object.findOne({ _id: o });
      object["weight"] = w + "%";
      await object.save();
    }
    const objects = await Object.find();
    res.json(objects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});*/
module.exports = router;
