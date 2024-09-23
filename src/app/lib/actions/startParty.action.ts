"use server";

//server action to generate a unique party code, initialize the party in the database, and return the party code

import Party from "@/models/Party";
import connectDB from "../connectDB";
import { NewParty } from "@/types/partyTypes";
import { Party as iParty } from "@/types/partyTypes";
import User from "@/models/User";
import { Competitor } from "@/types/userTypes";

export async function startParty(partyData: NewParty) {
  try {
    console.log("hostClerkId: ", partyData.hostClerkId);

    //check that the user with the given clerk id exists and is not already in a party as a competitor

    //check if any active parties have the same clerkId in the competitors array
    const competitorExists = await Party.findOne({
      competitors: { $elemMatch: { clerkId: partyData.hostClerkId } },
      active: true,
    });

    if (competitorExists) {
      throw new Error("User is already in a party");
    }

    //find host user in the database#
    const hostUser = await User.findOne({ clerkId: partyData.hostClerkId });

    //create a competitor object for the host user
    const hostCompetitor: Competitor = {
      user: hostUser,

      isHost: true,
    };

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
      competitors: [hostCompetitor],
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
