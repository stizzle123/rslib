import connectDb from "../../utils/connectDb";
import Collection from "../../models/Collection";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const collection = await Collection.findOne({ user: userId });
    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(403).send("Invalid token");
  }
};
