"use client";

import BrandButton from "@/components/atoms/BrandButton";
import BrandTextInput from "@/components/atoms/BrandTextInput";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {}

const JoinPartyPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const [partyCode, setPartyCode] = useState<string>("");

  function handleJoinPartyPressed() {
    router.push(`/party/${partyCode}`);
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
