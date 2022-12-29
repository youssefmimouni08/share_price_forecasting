const express = require("express");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const request = require("request");
const History = require("../../models/History");
const User = require("../../models/User");

const router = express.Router();

router.post("/model", auth, (req, res) => {
  let result = {};

  result["user"] = req.user;
  const options = {
    uri: "http://127.0.0.1:8000/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };
  console.log(result);
  request.post(options, async function (error, response, body) {
    if (error) {
      res.send(error);
    } else {
      result["forecast_object"] = JSON.parse(body);
      res.send(result);
      const history = new History({
        user: req.user,
        forecast_object: result["forecast_object"],
      });
      await history.save();
    }
  });
});

router.post("/model/paragraph", auth, async (req, res) => {
  let result = {};
  let user = await User.findById(req.user.id);

  result["user"] = user;
  const options = {
    uri: "http://127.0.0.1:8000/paragraph",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };

  request.post(options, async function (error, response, body) {
    if (error) {
      res.send(error);
    } else {
      body = JSON.parse(body);
      body.map(async (prediction) => {
        const history = new History({
          user: user.id,
          forecast_object: prediction,
        });
        await history.save();
      });
      //console.log(body)
      /*const history = new History({
        user: user.id,
        forecast_object: JSON.parse(body),
      });*/
      res.send(body);
      //await history.save();
    }
  });
});

module.exports = router;
