const jwt = require("jsonwebtoken");

// ----------------------------------------------------------------------

const jwtValidation = (req, res = response, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({ status: "error", message: "no token" });
    }

    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;

    next();
  } catch (error) {
    res.status(401).json({ status: "error", message: "invalid token" });
  }
};

module.exports = { jwtValidation };
