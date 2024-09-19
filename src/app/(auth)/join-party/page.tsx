"use client";

import { joinParty } from "@/app/lib/actions/joinParty.action";
import BrandButton from "@/components/atoms/BrandButton";
import BrandTextInput from "@/components/atoms/BrandTextInput";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Party as iParty } from "@/types/partyTypes";
import { useUser } from "@clerk/nextjs";

interface Props {}

const JoinPartyPage: NextPage<Props> = ({}) => {
  const { user } = useUser();

  const router = useRouter();
  const [partyCode, setPartyCode] = useState<string>("");

  async function handleJoinPartyPressed() {
    if (!user) {
      return;
    }

    const joinedParty: iParty = await joinParty(partyCode, user.id);
    router.push(`/party/${joinedParty._id}`);
  }

  return (
    <div>
      <h1>Join Party</h1>
      <BrandTextInput
        placeholder="Enter Party Code"
        value={partyCode}
        onChange={setPartyCode}
        label="Party Code"
      />

      <BrandButton label="Join Party" onPress={handleJoinPartyPressed} />
    </div>
  );
};

export default JoinPartyPage;
