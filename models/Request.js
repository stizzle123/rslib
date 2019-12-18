import mongoose from "mongoose";
import mongodbErrorHandler from "mongoose-mongodb-errors";
import User from "./User";

const { ObjectId } = mongoose.Schema.Types;

const requestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    justification: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const autopopulateUser = function(next) {
  this.populate("user", "_id name email avatar department ");
  next();
};

requestSchema.pre("find", autopopulateUser);

requestSchema.plugin(mongodbErrorHandler);

export default mongoose.models.Request ||
  mongoose.model("Request", requestSchema);
