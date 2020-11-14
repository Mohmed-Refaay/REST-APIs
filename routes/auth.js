const express = require("express");

const { body } = require("express-validator/check");

const authControllers = require("../controllers/auth");

const User = require("../models/user");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((email) => {
          if (email) {
            return Promise.reject("Email is already exist!");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authControllers.signup
);

router.post("/login", authControllers.login);

module.exports = router;
