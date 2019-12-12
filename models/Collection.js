import mongoose from "mongoose";
import Book from "./Book";

const { ObjectId } = mongoose.Schema;

const CollectionSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User"
    },
    books: [
      {
        type: ObjectId,
        ref: "Book"
      }
    ]
  },
  { timestamps: true }
);

const autoPopulateUserAndCollections = function(next) {
  this.populate("user", "_id name avatar department email");
  this.populate("books", "_id author imageUrl genre title summary");
  next();
};

CollectionSchema.pre("findOne", autoPopulateUserAndCollections);

export default mongoose.models.Collection ||
  mongoose.model("Collection", CollectionSchema);
