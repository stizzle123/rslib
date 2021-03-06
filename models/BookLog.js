const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const User = require("./User");
const Book = require("./Book");
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
  this.populate(
    "book",
    "_id title author imageUrl genre authorName quantity totalQty"
  );
  next();
};

bookLogSchema.pre("findOne", autoPopulateUserAndBook);
bookLogSchema.pre("find", autoPopulateUserAndBook);
bookLogSchema.pre("findOneAndUpdate", autoPopulateUserAndBook);

bookLogSchema.plugin(mongodbErrorHandler);

module.exports = BookLog = mongoose.model("BookLog", bookLogSchema);
