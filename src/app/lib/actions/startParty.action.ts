"use server";

//server action to generate a unique party code, initialize the party in the database, and return the party code

import Party from "@/models/Party";
import connectDB from "../connectDB";
import { NewParty } from "@/types/partyTypes";
import { Party as iParty } from "@/types/partyTypes";

export async function startParty(partyData: NewParty) {
  try {
    console.log("hostClerkId: ", partyData.hostClerkId);

    const party: iParty = {
      hostClerkId: partyData.hostClerkId,
      //generate random 6 digit code for party code
      code: Math.floor(100000 + Math.random() * 900000).toString(),
      name: partyData.name,
      description: partyData.description,
      theme: partyData.theme,
      startDate: partyData.startDate,
      endDate: partyData.endDate,
      active: true,
      competitors: [],
    };

    await connectDB();

    console.log(party.hostClerkId);
    const newParty = new Party(party);
    await newParty.save();
    return JSON.parse(JSON.stringify(newParty));
  } catch (err) {
    console.error("Error saving party:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
