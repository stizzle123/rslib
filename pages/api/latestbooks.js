import connectDb from "../../utils/connectDb";
import Book from "../../models/Book";

// connectDb();

export default async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: "desc" })
      .limit(5);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
