import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    clerkId: String,
    email: String,
    firstName: String,
    lastName: String,
    username: String,
    avatar: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", User);
