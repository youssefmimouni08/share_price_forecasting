const express = require("express");
const passport = require("passport");
require("../../config/passportConfig")(passport);
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const router = express.Router();

// Redirect the user to the Google signin page
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
// Retrieve user data using the access token received
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    jwt.sign(
      { user: req.user },
      "secretKey",
      { expiresIn: "6h" },
      (err, token) => {
        if (err) {
          return res.json({
            token: null,
          });
        }
        res.json({
          user: req.user,
          token,
        });
      }
    );
  }
);
// register user

module.exports = router;
