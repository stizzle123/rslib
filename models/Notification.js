const mongoose = require("mongoose");
const User = require("./User");
const { ObjectId } = mongoose.Schema.Types;

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User"
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

// const autopopulateUser = function(next) {
//   this.populate("user", "_id name avatar email department");
//   next();
// };

// notificationSchema.pre("find", autopopulateUser);

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
