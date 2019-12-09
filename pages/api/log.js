import mongoose from "mongoose";
import BookLog from "../../models/BookLog";
import Book from "../../models/Book";
import Notification from "../../models/Notification";
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
    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleCreateLog = async (req, res) => {
  const data = { ...req.body };
  try {
    const book = await Book.findOne({ _id: data.book });
    if (book.quantity < 1) {
      res.status(500).json("This book is currently out of stock");
      return;
    } else {
      await Book.findOneAndUpdate(
        { _id: book._id },
        { $inc: { quantity: -1 } }
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
