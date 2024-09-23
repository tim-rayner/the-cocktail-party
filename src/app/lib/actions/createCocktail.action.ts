"use server";

import Party from "@/models/Party";
import { Competitor } from "@/types/userTypes";

export async function createCocktail(competitor: Competitor, partyId: string) {
  try {
    // Step 1 - find the party by the party Id as long as the party is active
    const party = await Party.findOne({ _id: partyId, active: true });

    // if the party is not found, throw an error
    if (!party) {
      throw new Error("Party not found");
    }

    const competitors = party.competitors;

    // Step 2 - find the competitor by the ownerClerkId
    const existingCompetitor = competitors.find(
      (comp: Competitor) => comp.user.clerkId === competitor.user.clerkId
    );

    // if the competitor is not found, throw an error
    if (!existingCompetitor) {
      throw new Error("Competitor not found");
    }

    // Check if the competitor already has a cocktail
    if (existingCompetitor.cocktail) {
      throw new Error("Competitor already has a cocktail");
    }

    // Add the cocktail to the competitor
    existingCompetitor.cocktail = competitor.cocktail;

    // Mark the competitors path as modified
    party.markModified("competitors");

    // Save the party document
    await party.save();

    return JSON.parse(JSON.stringify(existingCompetitor.cocktail));
  } catch (err) {
    console.error("Error creating cocktail:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
