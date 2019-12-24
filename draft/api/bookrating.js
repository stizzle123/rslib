import Rating from "../../models/Rating";
import jwt from "jsonwebtoken";

import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  await connectDb();
  const { id } = req.query;
  try {
    const rating = await Rating.findOne({ book: id });
    res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
