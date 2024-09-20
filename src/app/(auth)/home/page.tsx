"use client";

import BrandButton from "@/components/atoms/BrandButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import cocktailGlass from "@/assets/cocktail-drink-glasses-free-svg-file.png";
import { useEffect, useState } from "react";
import { Party as iParty } from "@/types/partyTypes";
import { getActiveParties } from "@/app/lib/actions/getActiveParties.action";
import { useUser } from "@clerk/nextjs";
import { ObjectId } from "mongoose";

function HomePage() {
  const router = useRouter();
  const { user } = useUser();
  const [activeParties, setActiveParties] = useState<iParty[]>([]);

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

  function handleJoinAPartyPressed() {
    console.log("Join A Party");
    router.push("/join-party");
  }

  function handleStartAPartyPressed() {
    console.log("Start A Party");
    router.push("/start-party");
  }

  function handleStartALeaguePressed() {
    console.log("Start A League");
    router.push("/start-league");
  }

  function handleMyCocktailsPressed() {
    console.log("My Cocktails");
    router.push("/my-cocktails");
  }

  function handleMyAccountPressed() {
    console.log("My Account");
    router.push("/profile");
  }

  function handlePartyRedirect(partyId: ObjectId) {
    router.push(`/party/${partyId}`);
  }

  return (
    <div className="items-center content-center flex flex-col min-h-screen justify-center">
      <div className="header py-3">
        <Image
          src={cocktailGlass}
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          className="mx-auto"
        />
        <h1 className="text-center">Welcome to The Cocktail Party</h1>
      </div>

      <div className="buttons p-2 w-1/2 flex flex-col justify-center items-center space-y-6 ">
        <BrandButton label="Join A Party" onPress={handleJoinAPartyPressed} />
        <BrandButton label="Start A Party" onPress={handleStartAPartyPressed} />
        <BrandButton
          label="Start A League"
          onPress={handleStartALeaguePressed}
        />
        <BrandButton label="My Cocktails" onPress={handleMyCocktailsPressed} />
        <BrandButton label="My Account" onPress={handleMyAccountPressed} />

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
        <Link href="/rules" className="text-sm underline pt-6">
          The Cocktail Party Rules
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
