const mongoose = require("mongoose");
const User = require("./User");
const Book = require("./Book");
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const { ObjectId } = mongoose.Schema;

const ratingSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      required: true
    },
    user: {
      type: ObjectId,
      ref: "User"
    },
    book: {
      type: ObjectId,
      ref: "Book"
    },
    ratings: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      trim: true
    }
  },
  { timestamps: true }
);

const autoPopulateUserAndBook = function(next) {
  this.populate("user", "_id avatar name email");
  this.populate("book", "_id title authorName genre imageUrl");
  next();
};

ratingSchema.pre("find", autoPopulateUserAndBook);

ratingSchema.plugin(mongodbErrorHandler);

module.exports = Rating = mongoose.model("Rating", ratingSchema);
