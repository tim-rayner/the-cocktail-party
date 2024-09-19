"use client";

import { getParty } from "@/app/lib/actions/getParty.action";
import BrandButton from "@/components/atoms/BrandButton";
import Modal from "@/components/molecules/Modal";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Party as iParty } from "@/types/partyTypes";
import { Competitor } from "@/types/userTypes";

interface Props {
  params: { partyId: string };
}

const PartyHomePage: NextPage<Props> = ({ params }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [partyData, setPartyData] = useState<iParty>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchPartyData() {
      try {
        const data = await getParty(params.partyId);
        setPartyData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPartyData();
  }, [params.partyId]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !partyData) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Party Home Page</h1>
      <br />
      <p>Party ID: {params.partyId}</p>
      <p> party code: {partyData.code}</p>
      <p>Party Name: {partyData.name}</p>
      <p>Party Theme: {partyData.theme}</p>
      <p>Party Description: {partyData.description}</p>
      <p>Start Date: {partyData.startDate.toString()}</p>
      <p>End Date: {partyData.endDate.toString()}</p>

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
        <p> {partyData.competitors?.length} entrants</p>
        {partyData.competitors?.map((entrant: Competitor) => (
          <div
            key={entrant.user._id?.toString()}
            className="flex justify-between"
          >
            <p>{entrant.user.username}</p>
            <p>{entrant.cocktail?.name}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={handleModalClose}>
        <h1>Register Cocktail</h1>
        <p>Form goes here</p>
      </Modal>
    </div>
  );
};

export default PartyHomePage;
