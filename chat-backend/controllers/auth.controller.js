const { response } = require("express");
const bcrypt = require("bcryptjs");
// models
const Usuario = require("../models/user");
// helpers
const { generateJWT } = require("../helpers/jwt");

// ----------------------------------------------------------------------

const createUser = async (req, res = response) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await Usuario.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        status: "error",
        message: "email already exists",
      });
    }

    const user = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id);

    res.json({
      status: "success",
      message: "user created",
      meta: { user, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await Usuario.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        status: "error",
        message: "email not found",
      });
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        status: "error",
        message: "invalid password",
      });
    }

    const token = await generateJWT(userDB.id);

    res.json({
      status: "success",
      message: "user logged",
      meta: { user: userDB, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  const token = await generateJWT(uid);

  const user = await Usuario.findById(uid);

  res.json({ status: "success", message: "renewed", meta: { user, token } });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
