const User = require("../../models/User");
const Collection = require("../../models/Collection");
const Notification = require("../../models/Notification");
const Rating = require("../../models/Rating");
const Request = require("../../models/Request");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isLength = require("validator/lib/isLength");
const authy = require("authy")(process.env.AUTHY_API);

exports.handleChangePassword = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  const { confirmpassword, password } = req.body;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    if (password !== confirmpassword) {
      return res.status(422).json("Password does not match");
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .json("Password must be at least 6 characters long");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const updatedPass = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    res.status(200).json(updatedPass);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send("No User exists with that email");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      // authy.request_sms(user.authyId, true, result => {
      //   res.status(200).json({id: user._id});
      // });
      res.status(200).json({ id: user._id });
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user");
  }
};

exports.handleUserPermissions = async (req, res) => {
  const { id, role } = req.body;
  try {
    await User.findOneAndUpdate({ _id: id }, { $set: { role } });
    res.status(203).json("User updated");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.verify = async (req, res) => {
  const { id } = req.query;
  const { token } = req.body;
  try {
    const user = await User.findOne({ _id: id });

    authy.verify(user.authyId, token, true, (err, result) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.status(200).json(token);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

exports.deleteAccount = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    await Notification.deleteMany({ user: userId });
    await Collection.deleteMany({ user: userId });
    await Rating.deleteMany({ user: userId });
    await Request.deleteMany({ user: userId });
    await User.findOneAndDelete({ _id: userId });
    res.status(200).json("Account deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
