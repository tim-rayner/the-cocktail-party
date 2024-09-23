"use server";

import Party from "@/models/Party";
import connectDB from "../connectDB";
import User from "@/models/User";
import { Competitor } from "@/types/userTypes";
import { User as iUser } from "@/types/userTypes";
export async function joinParty(partyCode: string, clerkId: string) {
  try {
    await connectDB();

    //step 1: find the party by party code, ensuring its active
    const party = await Party.findOne({ code: partyCode, active: true });

    if (!party) {
      throw new Error("Party not found");
    }

    //step 2: find the user by clerkId from the database
    const activeUser: iUser | null = await User.findOne({ clerkId: clerkId });

    //add a check to ensure the user is not already in the party
    if (
      party.competitors.find(
        (competitor: Competitor) =>
          competitor.user.clerkId === activeUser?.clerkId
      )
    ) {
      throw new Error("User is already in the party");
    }

    if (!activeUser) {
      throw new Error("User not found");
    }

    //step 3: create the user a competitor class
    const competitor: Competitor = {
      user: activeUser,
      isHost: false,
    };

    //step 4: add the competitor to the party in the database
    party.competitors.push(competitor);

    await party.save();

    //step 5: feed back a success message to ensure the user has joined the party
    return JSON.parse(JSON.stringify(party));
  } catch (err) {
    console.error("Error joining party:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
