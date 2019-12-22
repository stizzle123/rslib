import Rating from "../../models/Rating";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetReview(req, res);
      break;

    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetReview = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const reviews = await Rating.find({ user: userId }).sort({
      createdAt: "desc"
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};
