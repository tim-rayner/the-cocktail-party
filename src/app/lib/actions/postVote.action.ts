import { Competitor } from "@/types/userTypes";
import connectDB from "../connectDB";
import Party from "@/models/Party";
import { CocktailVote } from "@/types/cocktailTypes";

export async function postVote(vote: CocktailVote) {
  try {
    await connectDB();

    // Step 1 - find the party by the party Id as long as the party is active
    const party = await Party.findOne({
      _id: vote.partyId,
      active: true,
    });

    // if the party is not found, throw an error
    if (!party) {
      throw new Error("Party not found");
    }

    const competitors = party.competitors;

    // Step 2 - find the competitor by the ownerClerkId
    const competitor: Competitor = competitors.find(
      (competitor: Competitor) => competitor.user.clerkId === vote.ownerClerkId
    );

    // if the competitor is not found, throw an error
    if (!competitor) {
      throw new Error("Competitor not found");
    }

    // Check the voterClerkId is not the same as the ownerClerkId of the cocktail owner
    if (vote.voterClerkId === competitor.cocktail?.ownerClerkId) {
      throw new Error("User cannot vote on their own cocktail");
    }

    // Check if the voterClerkId has already voted on the cocktail
    const existingVotes = competitor.cocktail?.votes;

    if (existingVotes) {
      const existingVote = existingVotes.find(
        (v) => v.voterClerkId === vote.voterClerkId
      );

      if (existingVote) {
        throw new Error("User has already voted on this cocktail");
      }
    }

    // Add the vote to the cocktail
    competitor.cocktail?.votes.push(vote);

    // Mark the competitors path as modified
    party.markModified("competitors");

    // Save the party document
    await party.save();

    return JSON.parse(JSON.stringify(competitor.cocktail));
  } catch (err) {
    console.error("Error saving vote:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
