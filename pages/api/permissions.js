import User from "../../models/User";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  // await connectDb();
  const { id, role } = req.body;
  try {
    await User.findOneAndUpdate({ _id: id }, { $set: { role } });
    res.status(203).json("User updated");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
