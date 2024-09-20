"use server";

import Party from "@/models/Party";
import connectDB from "../connectDB";

export async function getActiveParties(clerkId: string) {
  try {
    await connectDB();

    //I need to find all parties where the user is a competitor and the party is active
    const parties = await Party.find({
      "competitors.user.clerkId": clerkId,
      active: true,
    });

    if (!parties) {
      throw new Error("No active parties found");
    }

    return JSON.parse(JSON.stringify(parties));
  } catch (err) {
    console.error("Error getting party:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
