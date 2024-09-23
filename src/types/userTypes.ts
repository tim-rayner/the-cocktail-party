// import type { UserResource } from "@clerk/nextjs";

import mongoose from "mongoose";
import { Cocktail } from "./cocktailTypes";

// export interface User extends UserResource {}

export interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  //timestamps: true
  createdAt: Date;
  updatedAt: Date;
}

export interface Competitor {
  user: User;
  averageScore: number;
  isHost: boolean;
  cocktail?: Cocktail;
  partyId?: mongoose.Schema.Types.ObjectId;
}
