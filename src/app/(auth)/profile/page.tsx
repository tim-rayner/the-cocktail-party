"use client";

import { getActiveParties } from "@/app/lib/actions/getActiveParties.action";
import BrandButton from "@/components/atoms/BrandButton";
import { useAuth } from "@clerk/nextjs";
import { Party as iParty } from "@/types/partyTypes";

import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ObjectId } from "mongoose";
import { useRouter } from "next/navigation";

interface Props {}

const ProfilePage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { user } = useUser();
  const { signOut, isLoaded } = useAuth();

  const [activeParties, setActiveParties] = useState<iParty[]>([]);

  function handleLogout() {
    if (!isLoaded) {
      return;
    }
    signOut();
  }

  useEffect(() => {
    async function fetchActiveParties() {
      if (!user) {
        return;
      }
      try {
        const data = await getActiveParties(user.id);
        setActiveParties(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchActiveParties();
  }, [user]);

  function handlePartyRedirect(partyId: ObjectId) {
    router.push(`/party/${partyId}`);
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p> Profile page for: {user?.emailAddresses[0].emailAddress} </p>
      {user?.id === "user_2mGBRzN6csHLJ4bQL5ermIy4KK5" && (
        <p>
          the developer of this app would like you to know he hatessss you 💙
        </p>
      )}

      <div className="active-parties">
        <h2 className="text-center">Active Parties</h2>
        {activeParties.map((party) => (
          <div
            key={party.code}
            onClick={() => party._id && handlePartyRedirect(party._id)}
            className="hover:cursor-pointer"
          >
            <h3> - {party.name}</h3>
          </div>
        ))}
      </div>
      <BrandButton label="Logout" onPress={handleLogout} />
    </div>
  );
};

export default ProfilePage;
