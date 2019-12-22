import mongoose from "mongoose";
import BookLog from "../../models/BookLog";
import Book from "../../models/Book";
import Notification from "../../models/Notification";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await handleReturnBook(req, res);
      break;

    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleReturnBook = async (req, res) => {
  const data = { ...req.body };
  try {
    const book = await Book.findOne({ _id: data.book });
    const notification = `Recently returned ${book.title}`;
    await new Notification({
      message: notification,
      user: data.borrower
    }).save();
    const newLog = await BookLog.findOneAndUpdate(
      { _id: data._id },
      { $set: data },
      { new: true }
    );
    res.status(200).json(newLog);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
