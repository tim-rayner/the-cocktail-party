"use client";

import { createUser } from "@/app/lib/actions/user.action";
import BrandButton from "@/components/atoms/BrandButton";
import { useAuth } from "@clerk/nextjs";

import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";

interface Props {}

const ProfilePage: NextPage<Props> = ({}) => {
  const { user } = useUser();
  const { signOut, isLoaded } = useAuth();

  function handleLogout() {
    if (!isLoaded) {
      return;
    }
    signOut();
  }

  function handleAddDummyUser() {
    if (!isLoaded) {
      return;
    }

    const dummyUser = {
      clerkId: user?.id,
      email: user?.emailAddresses[0].emailAddress,
      firstName: "Timmy",
      lastName: "Tester",
      username: "Timmy Tester",
      avatar:
        "https://media.licdn.com/dms/image/v2/D4E03AQGaMRvh3Cbf7Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723424000990?e=1732147200&v=beta&t=yqXvqS9cNmae-IG0WPOAATKQl3pBD7s4N4EZGAu3RHQ",
    };

    console.log("Creating user in MongoDB:", dummyUser);

    try {
      createUser(dummyUser);
    } catch (err) {
      console.error("Error saving user:", err);
      return new Response(JSON.stringify({ message: (err as Error).message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p> {JSON.stringify(user)} </p>
      <BrandButton label="Logout" onPress={handleLogout} />
      <BrandButton label="Generate Dummy User" onPress={handleAddDummyUser} />
    </div>
  );
};

export default ProfilePage;
