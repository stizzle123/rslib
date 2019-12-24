import connectDb from "../../utils/connectDb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User";

export default async (req, res) => {
  await connectDb();
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send("No User exists with that email");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.status(200).json(token);
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user");
  }
};
