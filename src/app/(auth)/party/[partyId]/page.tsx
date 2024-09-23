"use client";

import { getParty } from "@/app/lib/actions/getParty.action";
import BrandButton from "@/components/atoms/BrandButton";
import Modal from "@/components/molecules/Modal";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Party as iParty } from "@/types/partyTypes";
import { Competitor } from "@/types/userTypes";

import CreateCocktailForm from "@/components/organisms/CreateCocktailForm";
import { useUser } from "@clerk/nextjs";
import { Cocktail, CocktailVote } from "@/types/cocktailTypes";
import { createCocktail } from "@/app/lib/actions/createCocktail.action";

interface Props {
  params: { partyId: string };
}

const PartyHomePage: NextPage<Props> = ({ params }) => {
  const router = useRouter();
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [partyData, setPartyData] = useState<iParty>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [currentCompetitor, setCurrentCompetitor] = useState<Competitor>();

  useEffect(() => {
    async function fetchPartyData() {
      try {
        const data = await getParty(params.partyId);

        setCurrentCompetitor(
          data.competitors.find((c: Competitor) => c.user.clerkId === user?.id)
        );
        setPartyData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPartyData();
  }, [params.partyId, user]);

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  function handleCocktailClick(ownerId: string) {
    console.log("Cocktail clicked");
    router.push(`/party/${params.partyId}/cocktail/${ownerId}`);
  }

  async function handleCreateCocktail(cocktail: Cocktail) {
    //
    console.log("Creating cocktail", cocktail);
    try {
      if (!currentCompetitor) {
        throw new Error("Current competitor not found");
      }

      const updatedCompetitor = { ...currentCompetitor };

      updatedCompetitor.cocktail = cocktail;

      const newCocktail: CocktailVote = await createCocktail(
        updatedCompetitor,
        params.partyId
      );

      console.log("Cocktail created", newCocktail);

      if (newCocktail) {
        setModalOpen(false);
        router.push(
          `/party/${params.partyId}/cocktail/${newCocktail.ownerClerkId}`
        );
      }
    } catch (err) {
      console.error("Error creating cocktail:", err);
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
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

      <p> Current Competitor: {currentCompetitor?.user.username}</p>
      <div className="flex flex-col space-y-4 w-3/4 mx-auto">
        <BrandButton label="Register Cocktail" onPress={handleModalOpen} />
      </div>
      <div className="flex flex-col space-y-4 w-3/4 mx-auto my-3">
        <BrandButton label="Leaderboard" onPress={handleModalOpen} />
      </div>

      {/* list of entrants where you're able to click through to vote  */}
      <div className="table-container w-3/4 mx-auto text-center">
        [entrants goes here]
        <p> {partyData.competitors?.length} entrants</p>
        {partyData.competitors?.map((entrant: Competitor) => (
          <div
            key={entrant.user._id?.toString()}
            className="flex justify-between"
            onClick={() => handleCocktailClick(entrant.user.clerkId)}
          >
            <p>{entrant.user.username}</p>
            <p>{entrant.cocktail?.name}</p>
          </div>
        ))}
      </div>

      {currentCompetitor && (
        <Modal isOpen={modalOpen} onClose={handleModalClose}>
          <CreateCocktailForm
            currentCompetitor={currentCompetitor}
            onCompleted={(e) => {
              handleCreateCocktail(e);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default PartyHomePage;
