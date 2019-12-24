const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

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
    about: {
      type: String,
      trim: true
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

module.exports = User = mongoose.model("User", userSchema);
