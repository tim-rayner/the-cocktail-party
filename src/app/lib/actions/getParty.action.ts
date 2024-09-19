"use server";

import Party from "@/models/Party";
import connectDB from "../connectDB";
import mongoose from "mongoose";

export async function getParty(partyId: string) {
  try {
    await connectDB();
    const party = await Party.findById(partyId);
    return JSON.parse(JSON.stringify(party));
  } catch (err) {
    console.error("Error getting party:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
