import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isLength from "validator/lib/isLength";

export default async (req, res) => {
  await connectDb();
  switch (req.method) {
    case "PATCH":
      await handleChangePassword(req, res);
      break;

    default:
      res.status(405).json(`Method ${req.method} not allowed`);
      break;
  }
};

const handleChangePassword = async (req, res) => {
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
