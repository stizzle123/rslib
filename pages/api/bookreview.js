import Rating from "../../models/Rating";
import jwt from "jsonwebtoken";

import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetBookReviews(req, res);
      break;

    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetBookReviews = async (req, res) => {
  const { id } = req.query;
  try {
    const ratings = await Rating.find({ book: id }).sort({ createdAt: "desc" });
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
