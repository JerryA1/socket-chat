/*
    path: /api/messages
*/
const { Router } = require("express");
// middlewares
const { jwtValidation } = require("../middlewares/jwt-validation");
// controllers
const { getChat } = require("../controllers/messages.controller");

// ----------------------------------------------------------------------

const router = Router();

router.get("/:from", jwtValidation, getChat);

module.exports = router;
