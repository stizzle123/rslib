import BookLog from "../../models/BookLog";
import User from "../../models/User";
import Notification from "../../models/Notification";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleOverdue(req, res);
      break;

    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleOverdue = async (req, res) => {
  let date = new Date();
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const logs = await BookLog.updateMany(
      { status: "in-use" },
      { status: "overdue" }
    )
      .where("returnDate")
      .lte(date);
    // Trigger Email notification to User

    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
