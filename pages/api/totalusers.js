import User from "../../models/User";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  // await connectDb();
  try {
    const count = await User.find().countDocuments();
    res.status(200).json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
