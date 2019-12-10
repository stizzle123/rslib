import User from "../../models/User";
import connectDb from "../../utils/connectDb";
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
    const users = await User.find({ _id: { $ne: userId } });
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json("User Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
