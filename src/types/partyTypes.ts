import { User } from "./userTypes";

export interface Party {
  _id: string;
  host: User;
  name: string;
  description: string;
  theme: string;
  startDate: string;
  endDate: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tourament {
  _id: string;
  competitors: User[];
  rounds: Party[];
  createdAt: string;
  updatedAt: string;
}
