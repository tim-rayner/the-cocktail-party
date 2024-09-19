import mongoose from "mongoose";
import { Competitor } from "./userTypes";

export interface Party {
  _id?: mongoose.Schema.Types.ObjectId;
  hostClerkId: string;
  name: string;
  description: string;
  theme: string;
  startDate: Date;
  endDate: Date;
  active?: boolean;
  code: string;
  competitors?: Competitor[];
  //timestamps: true
  createdAt?: string;
  updatedAt?: string;
}

export interface Tourament {
  _id?: mongoose.Schema.Types.ObjectId;
  competitors: Competitor[];
  rounds: Party[];
  //timestamps: true
  createdAt: string;
  updatedAt: string;
}

export interface NewParty {
  hostClerkId: string;
  name: string;
  description: string;
  theme: string;
  startDate: Date;
  endDate: Date;
}
