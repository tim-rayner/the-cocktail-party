import mongoose from "mongoose";

const Tournament = new mongoose.Schema(
  {
    competitors: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Competitor",
        },
      ],
      default: [],
    },
    name: String,
    rounds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Party",
        },
      ],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Tournament ||
  mongoose.model("Tournament", Tournament);
