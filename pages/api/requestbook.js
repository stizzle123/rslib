import Request from "../../models/Request";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await handleSubmitRequest(req, res);
      break;
    case "GET":
      await handleGetRequests(req, res);
      break;
    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleSubmitRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  const data = { ...req.body };

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const request = await new Request({
      ...data,
      user: userId
    }).save();
    // Trigger Email notification to PPM
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const handleGetRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: "desc" });
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
