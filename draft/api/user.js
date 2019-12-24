import User from "../../models/User";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  // await connectDb();
  switch (req.method) {
    case "GET":
      await handleGetUserDetails(req, res);
      break;
    case "PATCH":
      await handleUpdateUser(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetUserDetails = async (req, res) => {
  try {
    const id = req.query.id;
    const user = await User.findOne({ _id: id });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
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
