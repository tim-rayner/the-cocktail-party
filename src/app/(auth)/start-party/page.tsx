"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";

interface Props {}

const StartPartyPage: NextPage<Props> = ({}) => {
  const router = useRouter();

  function handleStartPartyPressed() {}
  return (
    <div>
      <h1>Start Party</h1>
    </div>
  );
};

export default StartPartyPage;
