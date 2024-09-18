import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      console.error(`Mongoose Error: ${error.message}`);
    } else {
      console.error(`Error: ${error}`);
    }
  }
};

export default connectDB;
