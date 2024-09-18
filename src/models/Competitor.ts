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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Competitor ||
  mongoose.model("Competitor", Competitor);
