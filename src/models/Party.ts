import mongoose from "mongoose";

const Party = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    description: String,
    theme: String,
    startDate: Date,
    endDate: Date,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Party || mongoose.model("Party", Party);
