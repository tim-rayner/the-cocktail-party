import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;

const connectDB = async () => {
  if (mongoose.connections && mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Mongodb connected");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
