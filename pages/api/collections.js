import mongoose from "mongoose";
import connectDb from "../../utils/connectDb";
import Collection from "../../models/Collection";
import jwt from "jsonwebtoken";

connectDb();

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetCollections(req, res);
      break;
    case "PUT":
      await handleUpdateCollections(req, res);
      break;
    case "DELETE":
      await handleDeleteCollection(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetCollections = async (req, res) => {
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

const handleUpdateCollections = async (req, res) => {
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

const handleDeleteCollection = async (req, res) => {
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
