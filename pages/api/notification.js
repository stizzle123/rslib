import Notification from "../../models/Notification";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  // await connectDb();
  switch (req.method) {
    case "GET":
      await handleGetNotification(req, res);
      break;
    case "DELETE":
      await handleDeleteNotification(req, res);
      break;

    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleGetNotification = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const data = await Notification.find({ user: userId }).sort({
      createdAt: "desc"
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const handleDeleteNotification = async (req, res) => {
  const id = req.body.id;

  try {
    const data = await Notification.findOneAndDelete({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
