"use client";

import { Party as iParty, NewParty } from "@/types/partyTypes";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { startParty } from "@/app/lib/actions/startParty.action";
import BrandButton from "@/components/atoms/BrandButton";
import { useUser } from "@clerk/nextjs";
import BrandTextInput from "@/components/atoms/BrandTextInput";
import { useState } from "react";

const StartPartyPage: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();

  const [partyName, setPartyName] = useState("");
  const [partyTheme, setPartyTheme] = useState("");
  const [partyDescription, setPartyDescription] = useState("");

  async function initiateParty() {
    try {
      if (!user) {
        console.error("User not found");
        return;
      }

      const mockPartyObject: NewParty = {
        hostClerkId: user.id,
        name: partyName,
        theme: partyTheme,
        description: partyDescription,
        startDate: new Date(),
        //end date is 1 day from now
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      const newParty: iParty = await startParty(mockPartyObject);

      //redirect to the party page
      router.push(`/party/${newParty._id}`);
    } catch (error) {
      console.error("Error starting party:", error);
      throw error;
    }
  }

  return (
    <div>
      <h1>Start Party</h1>

      <BrandTextInput
        value={partyName}
        label="Party Name"
        placeholder="Enter party name"
        onChange={setPartyName}
      />
      <BrandTextInput
        value={partyTheme}
        label="Theme"
        placeholder="Enter party theme"
        onChange={setPartyTheme}
      />
      <BrandTextInput
        value={partyDescription}
        onChange={setPartyDescription}
        label="Description"
        placeholder="Enter party description"
      />

      <BrandButton label="start mock party" onPress={initiateParty} />
    </div>
  );
};

export default StartPartyPage;
