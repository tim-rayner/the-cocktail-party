import { Cocktail } from "@/types/cocktailTypes";
import mongoose from "mongoose";

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
    // competitors: {
    //   type: [Object] as unknown as Competitor[],
    //   default: [],
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.CocktailParty ||
  mongoose.model("CocktailParty", PartySchema);
