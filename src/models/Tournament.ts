import mongoose from "mongoose";
import { Competitor } from "@/types/userTypes";

const Tournament = new mongoose.Schema(
  {
    competitors: [] as Competitor[],
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
