const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventory");
const validate = require("../utils/inventory-validation");
const util = require("../utils");

router.get("/", util.handleErrors(invController.getInventory));

router.get("/:_id", util.handleErrors(invController.getInventoryById));

router.post(
  "/",
  util.isAuthenticated,
  validate.invRules(),
  validate.checkInvData,
  util.handleErrors(invController.addInventory),
);

router.put(
  "/:_id",
  util.isAuthenticated,
  validate.invRules(),
  validate.checkInvData,
  util.handleErrors(invController.editInventoryById),
);

router.delete("/:_id", util.handleErrors(invController.deleteInventoryById));

module.exports = router;
