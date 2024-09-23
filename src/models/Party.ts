import { Cocktail } from "@/types/cocktailTypes";
import mongoose from "mongoose";

type Competitor = {
  clerkUserId: string;
  averageScore: number;
  isHost: boolean;
  cocktail: Cocktail;
};

const PartySchema = new mongoose.Schema(
  {
    hostClerkId: String,
    name: String,
    description: String,
    theme: String,
    startDate: Date,
    endDate: Date,
    active: Boolean,
    code: String,
    competitors: {
      type: [Object] as unknown as Competitor[],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.CocktailParty ||
  mongoose.model("CocktailParty", PartySchema);
