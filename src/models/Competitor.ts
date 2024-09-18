import mongoose from "mongoose";

const Competitor = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    standing: Number,
    averageScore: Number,
    isHost: Boolean,
    cocktail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cocktail",
    },
    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Competitor ||
  mongoose.model("Competitor", Competitor);
