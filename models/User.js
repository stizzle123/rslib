const mongoose = require("mongoose");
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
    },
    countryCode: {
      type: String,
      required: "Country code is required",
      trim: true
    },
    phone: {
      type: String,
      required: "Phone is required"
    },
    authyId: String,
    verified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.plugin(mongodbErrorHandler);

module.exports = User = mongoose.model("User", userSchema);
