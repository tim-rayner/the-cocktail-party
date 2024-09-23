"use server";

import Party from "@/models/Party";
import connectDB from "../connectDB";
import { Competitor } from "@/types/userTypes";

export async function getCocktail(partyId: string, competitorId: string) {
  try {
    console.log("partyId: ", partyId);
    await connectDB();

    // Step 1 - find the party by the partyId
    const party = await Party.findOne({
      _id: partyId,
    });

    // if the party is not found, throw an error
    if (!party) {
      throw new Error("Party not found");
    }

    const competitors = party.competitors;

    // Step 2 - find the competitor by the ownerClerkId
    const competitor: Competitor = competitors.find(
      (competitor: Competitor) => competitor.user.clerkId === competitorId
    );

    // if the competitor is not found, throw an error
    if (!competitor) {
      throw new Error("Competitor not found");
    }

    //if the competitor does not have a cocktail, return an empty object
    if (!competitor.cocktail) {
      return {};
    }

    competitor.cocktail.ownerName = competitor.user.username;

    return JSON.parse(JSON.stringify(competitor?.cocktail));
  } catch (err) {
    console.error("Error getting party:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
