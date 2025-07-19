const mongoDB = require("../databases/connect");
const { ObjectId } = require("mongodb");
const model = require(".");

async function createNewInventory(req, res) {
  const client = await mongoDB.connectToMongoDB();

  const inv = {
    ISBN: req.body.ISBN,
    title: req.body.title,
    author: req.body.author,
    releaseYear: req.body.releaseYear,
    publisher: req.body.publisher,
    format: req.body.format,
    pages: req.body.pages,
  };

  await client
    .db("project2")
    .collection("book")
    .insertOne(inv, (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result);
      res.send(`Id: ${res.body._id}`);
    });
}

async function editInventory(req, res) {
  const client = await mongoDB.connectToMongoDB();
  const id = new ObjectId(req.params._id);

  await model.getOneById(req, res, "book");

  const inv = {
    ISBN: req.body.ISBN,
    title: req.body.title,
    author: req.body.author,
    releaseYear: req.body.releaseYear,
    publisher: req.body.publisher,
    format: req.body.format,
    pages: req.body.pages,
  };

  await client
    .db("project2")
    .collection("book")
    .replaceOne({ _id: id }, inv, (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result);
    });
}

module.exports = { editInventory, createNewInventory };
