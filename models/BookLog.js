import mongoose from "mongoose";
import mongodbErrorHandler from "mongoose-mongodb-errors";
import User from "./User";
import Book from "./Book";
const { ObjectId } = mongoose.Schema.Types;

const bookLogSchema = new mongoose.Schema(
  {
    borrower: {
      type: ObjectId,
      ref: "User"
    },
    book: {
      type: ObjectId,
      ref: "Book"
    },
    status: {
      type: String,
      default: "in-use"
    },
    returnDate: {
      type: Date,
      required: "Return Date is required"
    }
  },
  { timestamps: true }
);

const autoPopulateUserAndBook = function(next) {
  this.populate("borrower", "_id name avatar department email");
  this.populate("book", "_id title author imageUrl genre authorName");
  next();
};

bookLogSchema.pre("findOne", autoPopulateUserAndBook);
bookLogSchema.pre("find", autoPopulateUserAndBook);

bookLogSchema.plugin(mongodbErrorHandler);

export default mongoose.models.BookLog ||
  mongoose.model("BookLog", bookLogSchema);
