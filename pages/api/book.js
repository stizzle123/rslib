import Book from "../../models/Book";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await handleCreateBook(req, res);
      break;
    case "GET":
      await handleGetBook(req, res);
      break;
    case "DELETE":
      await handleDeleteBook(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleCreateBook = async (req, res) => {
  const data = { ...req.body };
  try {
    const book = await new Book(data).save();
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const handleGetBook = async (req, res) => {
  const id = req.body.id;
  try {
    const book = await Book.findById({ _id: id });
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const handleDeleteBook = async (req, res) => {
  const id = req.body.id;
  try {
    await Book.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Book removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
