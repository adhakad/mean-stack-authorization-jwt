const express = require("express");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  
});

router.post("/login", async(req, res, next) => {
  
  let a = await User.findOne({ email: req.body.email })
    
      const token = jwt.sign(
        { email: a.email, userId: a._id },
        "secret_this_should_be_longer",
        { expiresIn: "1m" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 60
      });
    
});

module.exports = router;
