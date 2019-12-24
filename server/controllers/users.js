const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.handleGetUsersCount = async (req, res) => {
  try {
    const count = await User.find().countDocuments();
    res.status(200).json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleGetUserDetails = async (req, res) => {
  try {
    const id = req.query.id;
    const user = await User.findOne({ _id: id });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleUpdateUser = async (req, res) => {
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

exports.handleGetAllUsers = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const users = await User.find({ _id: { $ne: userId } }).sort({
      createdAt: "desc"
    });
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
