const { validationResult } = require("express-validator");

// ----------------------------------------------------------------------

const fieldsValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.mapped() });
  }

  next();
};

module.exports = { fieldsValidation };
