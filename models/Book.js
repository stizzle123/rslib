import mongoose from "mongoose";
import User from "./User";
import mongodbErrorHandler from "mongoose-mongodb-errors";

const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      default: "/images/no-image-available.png"
    },
    summary: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: "available"
    },
    quantity: {
      type: Number,
      default: 1,
      trim: true,
      min: 0
    },
    borrowers: [{ type: ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

// bookSchema.plugin(mongodbErrorHandler);
const populateBorrowers = function(next) {
  this.populate("borrowers", "_id name avatar department");
  next();
};

bookSchema.pre("findOne", populateBorrowers);

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
