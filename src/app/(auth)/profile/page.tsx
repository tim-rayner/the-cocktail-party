"use client";

import BrandButton from "@/components/atoms/BrandButton";
import { useAuth } from "@clerk/nextjs";

import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";

interface Props {}

const ProfilePage: NextPage<Props> = ({}) => {
  const user = useUser();
  const { signOut, isLoaded } = useAuth();

  function handleLogout() {
    if (!isLoaded) {
      return;
    }
    signOut();
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p> {JSON.stringify(user)} </p>
      <BrandButton label="Logout" onPress={handleLogout} />
    </div>
  );
};

export default ProfilePage;
