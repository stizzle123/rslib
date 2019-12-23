import Book from "../../models/Book";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  // await connectDb();
  switch (req.method) {
    case "POST":
      await handleCreateBook(req, res);
      break;
    case "GET":
      await handleGetBook(req, res);
      break;
    case "PATCH":
      await handleUpdateBook(req, res);
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
    const payload = {
      ...data,
      totalQty: data.quantity
    };
    const book = await new Book(payload).save();

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const handleGetBook = async (req, res) => {
  const { id } = req.query;
  try {
    const book = await Book.findOne({ _id: id });
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

const handleUpdateBook = async (req, res) => {
  let data = {};
  data = { ...req.body };

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: data.id },
      { $set: data },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
