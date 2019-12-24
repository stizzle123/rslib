import BookLog from "../../models/BookLog";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  await connectDb();
  switch (req.method) {
    case "GET":
      await handleGetBorrowedBooks(req, res);
      break;

    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetBorrowedBooks = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const books = await BookLog.find({ borrower: userId });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
