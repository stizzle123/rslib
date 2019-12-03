import mongoose from "mongoose";
import mongodbErrorHandler from "mongoose-mongodb-errors";

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
      trim: true
    }
  },
  { timestamps: true }
);

// bookSchema.plugin(mongodbErrorHandler);

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
