const express = require("express");
const User = require("../models/User");
const { body, matchedData, validationResult } = require("express-validator");
const { useRouteLoaderData } = require("react-router-dom");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "qwertyuioo";

router.post(
  "/createuser",
  cors({ origin: "https://merngofood-frontend.vercel.app/" }),
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        //   name: "harshitha",
        //   password: "harshi",
        //   email: "vsharshi@gmail.com",
        //   location: "bnglr",
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log("error");
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  cors({ origin: "https://merngofood-frontend.vercel.app/" }),
  [body("email").isEmail()],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { email, password } = req.body;
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log("error");
      res.json({ success: false });
    }
  }
);
module.exports = router;
