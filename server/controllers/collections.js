const mongoose = require("mongoose");
const Collection = require("../../models/Collection");
const jwt = require("jsonwebtoken");

const { ObjectId } = mongoose.Types;

exports.handleGetCollections = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const collection = await Collection.findOne({ user: userId });
    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(403).send("Invalid token");
  }
};

exports.handleUpdateCollections = async (req, res) => {
  const { bookId } = req.body;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const collection = await Collection.findOne({ user: userId });
    const collectionExists = collection.books.some(doc =>
      ObjectId(bookId).equals(doc._id)
    );
    if (collectionExists) {
      res.status(400).json("This book has already been borrowed by you.");
      return;
    } else {
      await Collection.findOneAndUpdate(
        { _id: collection._id },
        { $addToSet: { books: bookId } }
      );
      res.status(200).json("Book Updated");
    }
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
};

exports.handleDeleteCollection = async (req, res) => {
  const { bookId } = req.query;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const book = await Collection.findOneAndUpdate(
      { user: userId },
      { $pull: { books: bookId } }
    );
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
