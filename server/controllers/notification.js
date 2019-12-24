const Notification = require("../../models/Notification");
const jwt = require("jsonwebtoken");

exports.handleGetNotification = async (req, res) => {
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

exports.handleDeleteNotification = async (req, res) => {
  const id = req.body.id;

  try {
    const data = await Notification.findOneAndDelete({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
