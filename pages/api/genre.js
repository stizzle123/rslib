import Book from "../../models/Book";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { genre } = req.query;
  try {
    const books = await Book.find({ genre }).sort({ createdAt: "desc" });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
