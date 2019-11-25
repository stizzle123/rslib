import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";
import multer from "multer";
import jimp from "jimp";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "PATCH":
      await handleUpdateAvatar(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
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

const avatarUploadOptions = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith("image/")) {
      next(null, true);
    } else {
      next(null, false);
    }
  }
};

const uploadAvatar = multer(avatarUploadOptions).single("avatar");

const handleUpdateAvatar = async (req, res) => {
  uploadAvatar(req, res, async function(err) {
    try {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      if (!req.file) {
        return res.status(500).json("No File was Selected");
      }
      const extension = req.file.mimetype.split("/")[1];
      req.body.avatar = `/uploads/avatars/${req.body.name
        .split(" ")[0]
        .toLowerCase()}-${Date.now()}.${extension}`;
      const image = await jimp.read(req.file.buffer);
      await image.resize(250, jimp.AUTO);
      await image.write(`./public/${req.body.avatar}`);

      const updatedAvatar = await User.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: { avatar: req.body.avatar }
        },
        { new: true }
      );

      res.json(updatedAvatar);
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });
};

const handlePutRequest = async (req, res) => {
  req.body.updatedAt = new Date().toISOString();
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.json(updatedUser);
};

export const config = {
  api: {
    bodyParser: false
  }
};
