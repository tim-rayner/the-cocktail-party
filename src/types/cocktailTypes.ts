import { User } from "./userTypes";

export interface Cocktail {
  _id: string;
  name: string;
  description: string;
  theme: string;
  ingredients?: string[];
  instructions?: string;
  owner: User;
}
