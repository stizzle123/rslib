import User from "../../models/User";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await handleUpdateUser(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    const data = { ...req.body };
    const updatedUser = await User.findOneAndUpdate(
      { _id: data._id },
      { $set: data },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
