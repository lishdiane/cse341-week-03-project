const { body, validationResult } = require("express-validator");
const validate = {};

//validation rules
validate.accountRules = () => {
  return [
    body("fname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please enter a valid first name."),

    body("lname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please enter a valid last name."),

    body("phone")
      .trim()
      .escape()
      .blacklist("()-")
      .notEmpty()
      .withMessage("Please enter a valid phone number.")
      .isNumeric()
      .withMessage("Only numeric values are allowed.")
      .isLength(10)
      .withMessage(
        "Please enter a valid 10 digit phone number. eg.555-555-5555",
      )
      .toInt(),

    body("birthday")
      .trim()
      .notEmpty()
      .withMessage("Please enter a valid last name.")
      .isDate({ format: "MM/DD/YYYY" })
      .withMessage("Birth date must be in mm/dd/yyyy format.")
      .toDate(),

    body("books").isArray().withMessage("Books must be an array"),

    body("books.*").trim().isISBN().withMessage("Must be a valid ISBN number"),
  ];
};

validate.checkAccountData = async (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = validate;
