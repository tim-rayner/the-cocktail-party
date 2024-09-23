import mongoose from "mongoose";

//retired - the cocktail is now linked to the party
const Cocktail = new mongoose.Schema(
  {
    ownerClerkId: String,
    partyId: mongoose.Schema.Types.ObjectId,
    name: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Cocktail || mongoose.model("Cocktail", Cocktail);
