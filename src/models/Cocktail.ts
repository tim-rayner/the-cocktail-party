import mongoose from "mongoose";

const Cocktail = new mongoose.Schema(
  {
    name: String,
    description: String,
    theme: String,
    ingredients: [String],
    instructions: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Cocktail || mongoose.model("Cocktail", Cocktail);
