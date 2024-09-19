import mongoose from "mongoose";
import { User } from "./userTypes";

export interface Cocktail {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  theme: string;
  ingredients?: string[];
  instructions?: string;
  ownerClerkId: string;
  //timestamps: true
  createdAt: string;
  updatedAt: string;
}
