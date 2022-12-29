const express = require("express");
const router = express.Router();
const Event_type = require("../models/EventType");
router.get("/event_types", async (req, res) => {
  try {
    const event_types = await Event_type.find();
    res.json(event_types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/event_type", async (req, res) => {
  try {
    let eventType = await Event_type.findOne({ event: req.body.event });
    if (eventType) {
      return res
        .status(400)
        .json({ errors: [{ msg: "eventType already exists" }] });
    }
    eventType = new Event_type({
      event: req.body.event,
      questionTemplate: req.body.questionTemplate,
    });
    await eventType.save();
    res.json(eventType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/event_type/:event", async (req, res) => {
  try {
    const eventType = await Event_type.findOne({ event: req.params.event });
    if (!eventType) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Event type not found" }] });
    }

    let oldTemplate = eventType.questionTemplate;
    const newQuestions = req.body.questionTemplate;
    const compareQuestions = req.body.compareQuestions;

    if (compareQuestions) {
      for (let i = 0; i < newQuestions.length; i++) {
        let found = false;
        for (let j = 0; j < oldTemplate.length; j++) {
          if (newQuestions[i].question === oldTemplate[j].question) {
            found = true;
            break;
          }
        }
        if (!found) {
          oldTemplate.push(newQuestions[i]);
        }
      }
    } else {
      oldTemplate = newQuestions;
    }

    eventType.questionTemplate = oldTemplate;
    await eventType.save();
    res.json(eventType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
