"use server";

import Party from "@/models/Party";
import connectDB from "../connectDB";
import { Competitor } from "@/types/userTypes";

export async function getCocktail(partyId: string, competitorId: string) {
  try {
    await connectDB();

    // Step 1 - find the party by the party Id and populate competitors
    const party = await Party.findById(partyId);

    // Log the party object to see its contents
    console.log("Party object:", party);

    if (!party) {
      throw new Error("Party not found");
    }

    const competitors = party.competitors;

    // Log the competitors array to see its contents
    console.log("Party competitors:", party.competitors);

    // Use a more specific check for null or undefined
    if (competitors === null || competitors === undefined) {
      throw new Error("Competitors not found");
    }

    // Step 2 - find the competitor by the competitor Id
    const competitor: Competitor = competitors.find(
      (competitor: Competitor) => competitor.user.clerkId === competitorId
    );

    if (!competitor) {
      throw new Error("Competitor not found");
    }

    if (competitor.cocktail) {
      competitor.cocktail.ownerName = competitor.user.username;
    }

    return competitor.cocktail;
  } catch (err) {
    console.error("Error fetching cocktail:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
