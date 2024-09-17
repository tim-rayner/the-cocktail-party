"use client";

import BrandButton from "@/components/atoms/BrandButton";
import Modal from "@/components/molecules/Modal";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  params: { partyId: string };
}

const PartyHomePage: NextPage<Props> = ({ params }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  function handleLeaderboardClick() {
    console.log("Leaderboard clicked");
  }

  function handleEntrantClick() {
    console.log("Entrant clicked");
  }

  function handleCocktailClick() {
    console.log("Cocktail clicked");
    router.push(`/party/${params.partyId}/cocktail/${"abc321"}`);
  }

  return (
    <div>
      <h1>Party Home Page</h1>
      <p>Party ID: {params.partyId}</p>
      <div className="flex flex-col space-y-4 w-3/4 mx-auto">
        <BrandButton label="Register Cocktail" onPress={handleModalOpen} />
      </div>
      <div className="flex flex-col space-y-4 w-3/4 mx-auto my-3">
        <BrandButton label="Leaderboard" onPress={handleModalOpen} />
      </div>

      {/* list of entrants where you're able to click through to vote  */}
      <div
        className="table-container w-3/4 mx-auto text-center"
        onClick={handleCocktailClick}
      >
        [entrants goes here]
      </div>

      <Modal isOpen={modalOpen} onClose={handleModalClose}>
        <h1>Register Cocktail</h1>
        <p>Form goes here</p>
      </Modal>
    </div>
  );
};

export default PartyHomePage;
