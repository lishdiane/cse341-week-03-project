const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account");
const validate = require("../utils/account-validation");
const util = require("../utils");

router.get("/", util.handleErrors(accountController.getAccounts));

router.get("/:_id", util.handleErrors(accountController.getAccountById));

router.post(
  "/",
  util.isAuthenticated,
  validate.accountRules(),
  validate.checkAccountData,
  util.handleErrors(accountController.addAccount),
);

router.put(
  "/:_id",
  validate.accountRules(),
  validate.checkAccountData,
  util.handleErrors(accountController.editAccountById),
);

router.delete("/:_id", util.handleErrors(accountController.deleteAccountById));

module.exports = router;
