const model = require("../models");
const accountModel = require("../models/account-model");

async function getAccounts(req, res) {
  const account = await model.getAll(req, res, "user");

  res.send(account);
}

async function getAccountById(req, res) {
  const account = await model.getOneById(req, res, "user");

  res.send(account);
}

async function addAccount(req, res) {
  const account = await accountModel.createNewAccount(req, res);

  res.send(account);
}

async function editAccountById(req, res) {
  const account = await accountModel.editAccount(req, res);

  res.send(account);
}

async function deleteAccountById(req, res) {
  const account = await model.deleteById(req, res, "user");

  res.send(account);
}

module.exports = {
  getAccounts,
  getAccountById,
  addAccount,
  editAccountById,
  deleteAccountById,
};
