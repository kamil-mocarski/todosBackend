const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

// @route GET /auth
// @desc Get logged in user
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// @route POST /auth
// @desc Auth user & get token
// access Public

router.post(
  "/",
  check("email", "please enter correct email").isEmail(),
  check("password", "password is require").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "invalid credentials" });
      }
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "invalid credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
