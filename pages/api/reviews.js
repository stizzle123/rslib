import Rating from "../../models/Rating";

import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  // await connectDb();
  switch (req.method) {
    case "GET":
      await handleGetReviews(req, res);
      break;

    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetReviews = async (req, res) => {
  try {
    const ratings = await Rating.find({}).sort({ createdAt: "desc" });
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
