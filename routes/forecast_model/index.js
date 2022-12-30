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

router.post("/savePrediction", auth, async (req, res) => {
  const { prediction } = req.body;
  const history = new History({
    user: req.user.id,
    forecast_object: prediction,
  });
  await history.save();
  res.status(200);
});
router.post("/model/paragraph", auth, async (req, res) => {
  let result = {};
  let user = await User.findById(req.user.id);

  /* data = [
    {
      Artifact: {
        name: "oil deal",
        weight: 0.25,
      },
      Partie1: {
        borders: [
          {
            CountryID: {
              COUNTRY_NAME: "Brazil",
              OilProduction: "3.77%",
              _id: "634317624f816de80b711833",
            },
            _id: "6349aa186dd53c04dcf83c61",
            impact: "35.46%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Chile",
              OilProduction: "0.0065%",
              _id: "634317624f816de80b71183d",
            },
            _id: "6349aa186dd53c04dcf83c62",
            impact: "23.85%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Paraguay",
              OilProduction: "null",
              _id: "634317624f816de80b7118c8",
            },
            _id: "6349aa186dd53c04dcf83c63",
            impact: "64.61%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Uruguay",
              OilProduction: "null",
              _id: "634317624f816de80b7118f9",
            },
            _id: "6349aa186dd53c04dcf83c64",
            impact: "56.80%",
          },
        ],
        name: "Argentina",
        "oil Production": "0.6585%",
      },
      Partie2: {
        borders: [
          {
            CountryID: {
              COUNTRY_NAME: "Andorra",
              OilProduction: "null",
              _id: "634317624f816de80b71181a",
            },
            _id: "6349aa316dd53c04dcf83cd9",
            impact: "4.19%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Belgium",
              OilProduction: "null",
              _id: "634317624f816de80b711826",
            },
            _id: "6349aa316dd53c04dcf83cda",
            impact: "70.52%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Germany",
              OilProduction: "0.0463%",
              _id: "634317624f816de80b71184e",
            },
            _id: "6349aa316dd53c04dcf83cdb",
            impact: "24.38%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Italy",
              OilProduction: "0.1300%",
              _id: "634317624f816de80b711880",
            },
            _id: "6349aa316dd53c04dcf83cdc",
            impact: "49.07%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Luxembourg",
              OilProduction: "null",
              _id: "634317624f816de80b711896",
            },
            _id: "6349aa326dd53c04dcf83cdd",
            impact: "0.32%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Monaco",
              OilProduction: "null",
              _id: "634317624f816de80b71189b",
            },
            _id: "6349aa326dd53c04dcf83cde",
            impact: "31.06%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Spain",
              OilProduction: "0.0002%",
              _id: "634317624f816de80b711857",
            },
            _id: "6349aa326dd53c04dcf83cdf",
            impact: "35.80%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Switzerland",
              OilProduction: "null",
              _id: "634317624f816de80b71183c",
            },
            _id: "6349aa326dd53c04dcf83ce0",
            impact: "89.82%",
          },
        ],
        name: "France",
        "oil Production": "0.0169%",
      },
      event: "Argentina and France signed an oil deal.",
      event_impact: -0.0763,
      trigger_verb: {
        event_type: "Trade.Deal",
        name: "sign",
        weight: 0.32944355138375414,
      },
    },
    {
      Place: {
        borders: [
          {
            CountryID: {
              COUNTRY_NAME: "Iraq",
              OilProduction: "5.30%",
              _id: "634317624f816de80b71187d",
            },
            _id: "6349aa426dd53c04dcf83d28",
            impact: "26.64%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Saudi Arabia",
              OilProduction: "12.09%",
              _id: "634317624f816de80b7118d1",
            },
            _id: "6349aa426dd53c04dcf83d29",
            impact: "65.14%",
          },
        ],
        name: "Kuwait",
        "oil Production": "3.28%",
      },
      Responsible1: {
        borders: [
          {
            CountryID: {
              COUNTRY_NAME: "Iraq",
              OilProduction: "5.30%",
              _id: "634317624f816de80b71187d",
            },
            _id: "6349aa426dd53c04dcf83d28",
            impact: "26.64%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Saudi Arabia",
              OilProduction: "12.09%",
              _id: "634317624f816de80b7118d1",
            },
            _id: "6349aa426dd53c04dcf83d29",
            impact: "65.14%",
          },
        ],
        name: "Kuwait",
        "oil Production": "3.28%",
      },
      Victim: {
        borders: [
          {
            CountryID: {
              COUNTRY_NAME: "Iraq",
              OilProduction: "5.30%",
              _id: "634317624f816de80b71187d",
            },
            _id: "6349aa426dd53c04dcf83d28",
            impact: "26.64%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Saudi Arabia",
              OilProduction: "12.09%",
              _id: "634317624f816de80b7118d1",
            },
            _id: "6349aa426dd53c04dcf83d29",
            impact: "65.14%",
          },
        ],
        name: "Kuwait",
        "oil Production": "3.28%",
      },
      event: "They threatened Kuwait.",
      event_impact: 0.1246,
      trigger_verb: {
        event_type: "Conflict.Threat",
        name: "threaten",
        weight: 0.205,
      },
    },
    {
      Responsible: {
        borders: [
          {
            CountryID: {
              COUNTRY_NAME: "Iraq",
              OilProduction: "5.30%",
              _id: "634317624f816de80b71187d",
            },
            _id: "6349aa5b6dd53c04dcf83d98",
            impact: "76.14%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Jordan",
              OilProduction: "null",
              _id: "634317624f816de80b711883",
            },
            _id: "6349aa5b6dd53c04dcf83d99",
            impact: "81.46%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Kuwait",
              OilProduction: "3.28%",
              _id: "634317624f816de80b71188c",
            },
            _id: "6349aa5b6dd53c04dcf83d9a",
            impact: "93.25%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Oman",
              OilProduction: "1.26%",
              _id: "634317624f816de80b7118bc",
            },
            _id: "6349aa5b6dd53c04dcf83d9b",
            impact: "15.24%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Qatar",
              OilProduction: "1.69%",
              _id: "634317624f816de80b7118cb",
            },
            _id: "6349aa5b6dd53c04dcf83d9c",
            impact: "77.01%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Yemen",
              OilProduction: "0.0910%",
              _id: "634317624f816de80b711905",
            },
            _id: "6349aa5c6dd53c04dcf83d9d",
            impact: "48.89%",
          },
        ],
        name: "Saudi Arabia",
        "oil Production": "12.09%",
      },
      Target: {
        borders: [
          {
            CountryID: {
              COUNTRY_NAME: "Iraq",
              OilProduction: "5.30%",
              _id: "634317624f816de80b71187d",
            },
            _id: "6349aa5b6dd53c04dcf83d98",
            impact: "76.14%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Jordan",
              OilProduction: "null",
              _id: "634317624f816de80b711883",
            },
            _id: "6349aa5b6dd53c04dcf83d99",
            impact: "81.46%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Kuwait",
              OilProduction: "3.28%",
              _id: "634317624f816de80b71188c",
            },
            _id: "6349aa5b6dd53c04dcf83d9a",
            impact: "93.25%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Oman",
              OilProduction: "1.26%",
              _id: "634317624f816de80b7118bc",
            },
            _id: "6349aa5b6dd53c04dcf83d9b",
            impact: "15.24%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Qatar",
              OilProduction: "1.69%",
              _id: "634317624f816de80b7118cb",
            },
            _id: "6349aa5b6dd53c04dcf83d9c",
            impact: "77.01%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Yemen",
              OilProduction: "0.0910%",
              _id: "634317624f816de80b711905",
            },
            _id: "6349aa5c6dd53c04dcf83d9d",
            impact: "48.89%",
          },
        ],
        name: "Saudi Arabia",
        "oil Production": "12.09%",
      },
      Victim: {
        borders: [
          {
            CountryID: {
              COUNTRY_NAME: "Iraq",
              OilProduction: "5.30%",
              _id: "634317624f816de80b71187d",
            },
            _id: "6349aa5b6dd53c04dcf83d98",
            impact: "76.14%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Jordan",
              OilProduction: "null",
              _id: "634317624f816de80b711883",
            },
            _id: "6349aa5b6dd53c04dcf83d99",
            impact: "81.46%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Kuwait",
              OilProduction: "3.28%",
              _id: "634317624f816de80b71188c",
            },
            _id: "6349aa5b6dd53c04dcf83d9a",
            impact: "93.25%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Oman",
              OilProduction: "1.26%",
              _id: "634317624f816de80b7118bc",
            },
            _id: "6349aa5b6dd53c04dcf83d9b",
            impact: "15.24%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Qatar",
              OilProduction: "1.69%",
              _id: "634317624f816de80b7118cb",
            },
            _id: "6349aa5b6dd53c04dcf83d9c",
            impact: "77.01%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Yemen",
              OilProduction: "0.0910%",
              _id: "634317624f816de80b711905",
            },
            _id: "6349aa5c6dd53c04dcf83d9d",
            impact: "48.89%",
          },
        ],
        name: "Saudi Arabia",
        "oil Production": "12.09%",
      },
      event: "They invaded Saudi Arabia.",
      event_impact: "null",
      place: {
        borders: [
          {
            CountryID: {
              COUNTRY_NAME: "Iraq",
              OilProduction: "5.30%",
              _id: "634317624f816de80b71187d",
            },
            _id: "6349aa5b6dd53c04dcf83d98",
            impact: "76.14%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Jordan",
              OilProduction: "null",
              _id: "634317624f816de80b711883",
            },
            _id: "6349aa5b6dd53c04dcf83d99",
            impact: "81.46%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Kuwait",
              OilProduction: "3.28%",
              _id: "634317624f816de80b71188c",
            },
            _id: "6349aa5b6dd53c04dcf83d9a",
            impact: "93.25%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Oman",
              OilProduction: "1.26%",
              _id: "634317624f816de80b7118bc",
            },
            _id: "6349aa5b6dd53c04dcf83d9b",
            impact: "15.24%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Qatar",
              OilProduction: "1.69%",
              _id: "634317624f816de80b7118cb",
            },
            _id: "6349aa5b6dd53c04dcf83d9c",
            impact: "77.01%",
          },
          {
            CountryID: {
              COUNTRY_NAME: "Yemen",
              OilProduction: "0.0910%",
              _id: "634317624f816de80b711905",
            },
            _id: "6349aa5c6dd53c04dcf83d9d",
            impact: "48.89%",
          },
        ],
        name: "Saudi Arabia",
        "oil Production": "12.09%",
      },
      trigger_verb: {
        event_type: "Conflict.Attack",
        name: "invade",
        weight: 0.205,
      },
    },
  ];
  res.send(data);*/
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
      res.send(body);
    }
  });
});

module.exports = router;
