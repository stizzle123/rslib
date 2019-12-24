const Book = require("../../models/Book.js");

exports.handleCreateBook = async (req, res) => {
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

exports.handleGetBook = async (req, res) => {
  const { id } = req.query;
  try {
    const book = await Book.findOne({ _id: id });
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleDeleteBook = async (req, res) => {
  const id = req.body.id;
  try {
    await Book.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Book removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleUpdateBook = async (req, res) => {
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

exports.handleGetBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: "desc" });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleGetGenre = async (req, res) => {
  const { genre } = req.query;
  try {
    const books = await Book.find({ genre }).sort({ createdAt: "desc" });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleGetLatestBooks = async (req, res) => {
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
