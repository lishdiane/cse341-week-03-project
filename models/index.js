const mongoDB = require("../databases/connect");
const { ObjectId } = require("mongodb");

async function getAll(req, res, collection) {
  const client = await mongoDB.connectToMongoDB();

  const data = await client.db("project2").collection(collection).find();
  const array = await data.toArray();

  return array;
}

async function getOneById(req, res, collection) {
  const client = await mongoDB.connectToMongoDB();
  const id = new ObjectId(req.params._id);

  const response = await client
    .db("project2")
    .collection(collection)
    .findOne({ _id: id });

  if (!response) {
    res.status(400).json("Not found. Check Id and try again.");
  }
  return response;
}

async function deleteById(req, res, collection) {
  const client = await mongoDB.connectToMongoDB();
  const id = new ObjectId(req.params._id);

  await getOneById(req, res, collection);

  await client
    .db("project2")
    .collection(collection)
    .deleteOne({ _id: id }, (error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result);
    });
}

module.exports = { getAll, getOneById, deleteById };
