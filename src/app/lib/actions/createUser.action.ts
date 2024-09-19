"use server";

import User from "@/models/User";
import connectDB from "../connectDB";

export async function createUser(user: any) {
  try {
    await connectDB();
    const newUser = new User(user);
    await newUser.save();
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    console.error("Error saving user:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
