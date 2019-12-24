const Request = require("../../models/Request");
const jwt = require("jsonwebtoken");

exports.handleSubmitRequest = async (req, res) => {
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

exports.handleGetRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: "desc" });
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
