import mongoose from "mongoose";

export type CocktailVote = {
  ownerClerkId: string; //???
  partyId: mongoose.Schema.Types.ObjectId | string;
  voterClerkId: string;
  voterUsername: string; //added for convenience
  breakdown: {
    aroma: number;
    taste: number;
    creativity: number;
    presentation: number;
    difficulty: number;
  };
};

export interface Cocktail {
  ownerClerkId: string;
  ownerName?: string;
  partyId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  theme: string;
  ingredients: string[];
  instructions: string;
  image: string;
  votes: CocktailVote[];
  //timestamps: true
  createdAt?: string;
  updatedAt?: string;
}
