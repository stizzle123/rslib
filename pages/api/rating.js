import Rating from "../../models/Rating";
import jwt from "jsonwebtoken";

import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRatings(req, res);
      break;
    case "POST":
      await handlePostRating(req, res);
      break;
    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: "desc" });
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const handlePostRating = async (req, res) => {
  const data = { ...req.body };
  const payload = {
    user: data.user,
    book: data.book,
    ratings: data.ratings,
    review: data.review
  };
  try {
    const rating = await new Rating(payload).save();
    res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
