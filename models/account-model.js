const mongoDB = require("../databases/connect");
const { ObjectId } = require("mongodb");
const model = require(".");

async function createNewAccount(req, res) {
  const client = await mongoDB.connectToMongoDB();
  const user = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    birthday: req.body.birthday,
    books: req.body.books,
  };
  await client
    .db("project2")
    .collection("user")
    .insertOne(user, (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result);
      res.send(`Id: ${res.body._id}`);
    });
}

async function editAccount(req, res) {
  const client = await mongoDB.connectToMongoDB();
  const id = new ObjectId(req.params._id);

  const result = await model.getOneById(req, res, "user");

  const user = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    birthday: req.body.birthday,
    books: req.body.books,
  };

  if (result) {
    await client
      .db("project2")
      .collection("user")
      .replaceOne({ _id: id }, user, (error, result) => {
        if (error) {
          console.log(error);
        }
        console.log(result);
      });
  }
}

module.exports = { editAccount, createNewAccount };
