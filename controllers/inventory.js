const model = require("../models");
const invModel = require("../models/inventory-model");

async function getInventory(req, res) {
  const inventory = await model.getAll(req, res, "book");

  res.send(inventory);
}

async function getInventoryById(req, res) {
  const inventory = await model.getOneById(req, res, "book");

  res.send(inventory);
}

async function addInventory(req, res) {
  const account = await invModel.createNewInventory(req, res);

  res.send(account);
}

async function editInventoryById(req, res) {
  const account = await invModel.editInventory(req, res);

  res.send(account);
}

async function deleteInventoryById(req, res) {
  const account = await model.deleteById(req, res, "book");

  res.send(account);
}

module.exports = {
  getInventory,
  getInventoryById,
  addInventory,
  editInventoryById,
  deleteInventoryById,
};
