/*
    path: /api/login
*/
const { Router } = require("express");
const { check } = require("express-validator");
// controllers
const {
  createUser,
  login,
  renewToken,
} = require("../controllers/auth.controller");
// middlewares
const { fieldsValidation } = require("../middlewares/fields-validation");
const { jwtValidation } = require("../middlewares/jwt-validation");

// ----------------------------------------------------------------------

const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldsValidation,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldsValidation,
  ],
  login
);

router.get("/renew", jwtValidation, renewToken);

module.exports = router;
