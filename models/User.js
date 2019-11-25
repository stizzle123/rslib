import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
import mongodbErrorHandler from "mongoose-mongodb-errors";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Name is Required"
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email is required"
    },
    avatar: {
      type: String,
      required: "Avatar is required",
      default: "/images/profile-image.jpg"
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"]
    },
    department: {
      type: String,
      required: "Department is required",
      trim: true,
      lowercase: true
    }
  },
  { timestamps: true }
);

const autoPopulateFollowingAndFollowers = function(next) {
  this.populate("following", "_id name avatar");
  this.populate("followers", "_id name avatar");
  next();
};

userSchema.pre("findOne", autoPopulateFollowingAndFollowers);

userSchema.plugin(mongodbErrorHandler);

export default mongoose.models.User || mongoose.model("User", userSchema);
