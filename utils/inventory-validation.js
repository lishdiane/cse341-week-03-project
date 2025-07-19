const { body, validationResult } = require("express-validator");
const validate = {};

//validation rules
validate.invRules = () => {
  return [
    body("ISBN").trim().isISBN().withMessage("Must be a valid ISBN number"),

    body("title")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please enter a valid title."),

    body("author")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please enter a valid author."),

    body("releaseYear")
      .trim()
      .escape()
      .notEmpty()
      .isNumeric()
      .matches(/18[0-9]{2}|19[0-9]{2}|20[0-9]{2}/)
      .withMessage("Year must be a valid 4 digit number"),

    body("publisher")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please enter a valid publisher."),

    body("format")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please enter a valid format."),

    body("pages")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please enter a valid total page value.")
      .isNumeric()
      .withMessage("Pages must be a numerical value."),
  ];
};

validate.checkInvData = async (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = validate;
