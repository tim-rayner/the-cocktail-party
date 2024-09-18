// import type { UserResource } from "@clerk/nextjs";

// export interface User extends UserResource {}

export interface User {
  _id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Competitor {
  user: User;
  standing: number;
  averageScore: number;
  isHost: boolean;
}
