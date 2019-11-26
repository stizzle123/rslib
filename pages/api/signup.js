import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";

connectDb();

export default async (req, res) => {
  const { name, email, password, department } = req.body;
  try {
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send("Name must be 3-10 characters long");
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send("Password must be at least 6 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid.");
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await new User({
      name,
      email,
      department,
      password: hash
    }).save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up user. Please try again later");
  }
};
