import mongoose from "mongoose";
import BookLog from "../../models/BookLog";
import Book from "../../models/Book";
import Notification from "../../models/Notification";
import jwt from "jsonwebtoken";
import Collection from "../../models/Collection";
import connectDb from "../../utils/connectDb";
const { ObjectId } = mongoose.Types;

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await handleCreateLog(req, res);
      break;
    case "GET":
      await handleGetLogs(req, res);
      break;
    case "PATCH":
      await handleUpdateLog(req, res);
      break;
    case "DELETE":
      await handleDeleteLog(req, res);
      break;
    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleCreateLog = async (req, res) => {
  const data = { ...req.body };
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const book = await Book.findOne({ _id: data.book });
    if (book.quantity - book.borrowers.length === 0) {
      res.status(500).json("This book is currently out of stock");
      return;
    } else {
      const isBorrowed = await Book.findOne({
        _id: data.book,
        borrowers: { $in: userId }
      });
      if (isBorrowed) {
        res
          .status(500)
          .json(`${isBorrowed.title} has already been borrowed by you.`);
        return;
      } else {
        await Book.findOneAndUpdate(
          { _id: book._id },
          { $addToSet: { borrowers: userId } }
        );
        const collection = await Collection.findOne({ user: data.borrower });
        await Collection.findOneAndUpdate(
          { _id: collection._id },
          { $addToSet: { books: data.book } }
        );

        const notification = `Recently borrowed ${book.title}`;
        const booklog = await new BookLog(data).save();
        await new Notification({
          message: notification,
          user: data.borrower
        }).save();

        res.status(200).json(booklog);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const handleGetLogs = async (req, res) => {
  try {
    const logs = await BookLog.find();
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const handleUpdateLog = async (req, res) => {
  const data = { ...req.body };

  try {
    let getLog = await BookLog.findOne({ _id: data.id });
    await Book.findOneAndUpdate(
      { _id: getLog.book._id },
      { $pull: { borrowers: getLog.borrower } }
    );
    const updatedLog = await BookLog.findOneAndUpdate(
      { _id: data.id },
      { $set: { status: "closedout" } },
      { new: true }
    );
    res.status(200).json(updatedLog);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const handleDeleteLog = async (req, res) => {
  const id = req.body.id;
  try {
    const bookLog = await BookLog.findOneAndDelete({ _id: id });
    res.status(200).json("Book has been removed successfully", bookLog);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
