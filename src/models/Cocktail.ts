import mongoose from "mongoose";

const Cocktail = new mongoose.Schema(
  {
    name: String,
    description: String,
    theme: String,
    ingredients: [String],
    instructions: String,
    ownerClerkId: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Cocktail || mongoose.model("Cocktail", Cocktail);
