const express = require("express");
const router = express.Router();
const Trigger = require("../models/Trigger");
const EventType = require("../models/EventType");

router.get("/triggers", async (req, res) => {
  try {
    const triggers = await Trigger.find().populate({
      path: "event_type",
      model: EventType,
    });

    res.json(triggers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*router.get("/Verbs", async (req, res) => {
  try {
    verb_id = [];
    const verbs = await Verb.find().select("_id");
    for (v of verbs) {
      verb_id.push(v._id);
    }
    res.json(verb_id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});*/
router.get("/triggers/:trigger", async (req, res) => {
  try {
    const trigger = await Trigger.findOne({
      trigger: req.params.trigger,
    })
      .populate({
        path: "event_type",
        model: EventType,
      })
      .select("weight event_type -_id");
    res.json(trigger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/trigger", async (req, res) => {
  let triggers = req.body.triggers;
  let savedtriggers = [];
  try {
    for (let t of triggers) {
      let trigger = await Trigger.findOne({ trigger: t.trigger });
      if (trigger) {
        console.log(
          `this trigger : ${t.trigger} already exist in the database `
        );
        continue;
      }
      trigger = new Trigger({
        trigger: t.trigger,
        weight: t.weight,
        event_type: req.body.event_type_id,
      });
      savedtriggers.push(trigger);
      await trigger.save();
    }

    res.json(savedtriggers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/triggers/", async (req, res) => {
  const { trigger_name, trigger_weight } = req.body;
  try {
    let v = await Trigger.findOne({
      trigger: trigger_name,
    });
    if (!v) {
      v = new Trigger({
        trigger: trigger_name,
        weight: trigger_weight,
        suggested_weights: [trigger_weight],
      });
      await v.save();
      return res.json(v);
    }
    if (!v["suggested_weights"].includes(trigger_weight)) {
      v["suggested_weights"] = [...v["suggested_weights"], trigger_weight];
    }
    sum = 0;
    v.suggested_weights.map((o) => {
      sum = sum + parseFloat(o);
    });
    median_weight = sum / v.suggested_weights.length;

    v.weight = median_weight.toFixed(4);
    await v.save();
    res.json(v);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
