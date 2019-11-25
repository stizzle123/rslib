import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB database connected successfully`);

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("MongoDB database failed to connect", error);
  }
}

export default connectDb;
