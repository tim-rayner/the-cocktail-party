"use server";

import User from "@/models/User";

export async function createUser(user: any) {
  try {
    const newUser = new User(user);
    await newUser.save();
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    console.error("Error saving user:", err);
    throw new Error(err.message);
  }
}
