"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";

interface Props {}

const StartLeaguePage: NextPage<Props> = ({}) => {
  const router = useRouter();

  function handleStartLeaguePressed() {}
  return (
    <div>
      <h1>Start League</h1>
    </div>
  );
};

export default StartLeaguePage;
