/**
 * @todo Implement the scoring logic
 */
"use server";

import { CocktailVote } from "@/types/cocktailTypes";
import { Competitor } from "@/types/userTypes";

//helper function to take the votes and calculate the score for each participant then return the updated participants in descending order
export function scoreParticipants(
  participants: Competitor[],
  votes: CocktailVote[]
): Competitor[] {
  //TODO: Implement the scoring logic
  return [];
}
