import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

export default async (req, res) => {
  await connectDb();
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PATCH":
      await handleUpdateAvatar(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
}

const handleUpdateAvatar = async (req, res) => {
  try {
    const { _id, avatar } = req.body;

    const updatedAvatar = await User.findOneAndUpdate(
      { _id: _id },
      {
        $set: { avatar: avatar }
      },
      { new: true }
    );
    res.status(200).json(updatedAvatar);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };
