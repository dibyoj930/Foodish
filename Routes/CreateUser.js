const express = require("express");
const User = require("../models/User");

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "MynameisMukherjee"
const { body, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
router.post("/createUser",
  [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })]
  ,
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
        location: req.body.location
      })
      res.json({ success: true });

    }
    catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  })

router.post("/loginuser", [
  body('email').isEmail(),
  body('password', 'Incorrect Password').isLength({ min: 5 }),

],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    let email = req.body.email; 

    try {

      let userdata = await mongoose.model('User').findOne({ email })
      if (!userdata) {
        return res.status(400).json({ errors: "Try logging with correct credentials" })
      }
      let passcmd = await bcrypt.compare(req.body.password, userdata.password)
      if (!passcmd) {
        return res.status(400).json({ errors: "Try logging with correct credentials" })
      }
      const data = {
        user: {
          id: userdata.id,
        }
      }
      const authToken = jwt.sign(data, jwtsecret);
      return res.json({ success: true, authToken: authToken })

    }
    catch (err) {
      console.log(err);
      res.json({ success: false });
    }

  })
module.exports = router;