"use client";

import { getCocktail } from "@/app/lib/actions/getCocktail.action";
import { postVote } from "@/app/lib/actions/postVote.action";
import BrandButton from "@/components/atoms/BrandButton";
import BrandTextInput from "@/components/atoms/BrandTextInput";
import { Cocktail, CocktailVote } from "@/types/cocktailTypes";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { competitorId: string; partyId: string };
}

const CocktailVotingPage: NextPage<Props> = ({ params }) => {
  const router = useRouter();
  const [cocktail, setCocktail] = useState<Cocktail>();
  const [newVote, setNewVote] = useState<CocktailVote>({
    ownerClerkId: params.competitorId,
    partyId: params.partyId,
    voterClerkId: "",
    voterUsername: "",
    breakdown: {
      aroma: 10,
      taste: 10,
      creativity: 10,
      presentation: 10,
      difficulty: 10,
    },
  });

  useEffect(() => {
    try {
      fetchCocktail();
    } catch (err) {
      console.error("Error getting cocktail:", err);
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }, [params]);

  async function fetchCocktail() {
    if (cocktail) {
      return;
    }
    const response = await getCocktail(params.partyId, params.competitorId);
    setCocktail(response);
  }

  async function submitVote() {
    try {
      const voteSubmission = await postVote(newVote);
      console.log("voteSubmission: ", voteSubmission);
      if (voteSubmission) {
        router.push(`/party/${params.partyId}`);
      }
    } catch (err) {
      console.error("Error submitting vote:", err);
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  if (!cocktail)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (!cocktail.ownerClerkId)
    return (
      <div>
        <h1>
          This user has not yet registered their cocktail for this party 🥲
        </h1>
      </div>
    );

  return (
    <div className="items-center content-center align-middle flex flex-col py-12">
      <img
        src={cocktail.image}
        alt={cocktail.name}
        className="rounded-full h-40 w-40"
      />
      <h1 className="font-bold text-4xl pt-6 text-center">{cocktail.name}</h1>
      <h2 className="font-sans text-xl pt-1 text-center">
        by {cocktail.ownerName}
      </h2>

      <div className="voteCard">
        <BrandTextInput
          label="Aroma"
          value={newVote.breakdown.aroma.toString()}
          onChange={(value) =>
            setNewVote({
              ...newVote,
              breakdown: { ...newVote.breakdown, aroma: parseInt(value) },
            })
          }
        />

        <BrandTextInput
          label="Taste"
          value={newVote.breakdown.taste.toString()}
          onChange={(value) =>
            setNewVote({
              ...newVote,
              breakdown: { ...newVote.breakdown, taste: parseInt(value) },
            })
          }
        />

        <BrandTextInput
          label="Creativity"
          value={newVote.breakdown.creativity.toString()}
          onChange={(value) =>
            setNewVote({
              ...newVote,
              breakdown: { ...newVote.breakdown, creativity: parseInt(value) },
            })
          }
        />

        <BrandTextInput
          label="Presentation"
          value={newVote.breakdown.presentation.toString()}
          onChange={(value) =>
            setNewVote({
              ...newVote,
              breakdown: {
                ...newVote.breakdown,
                presentation: parseInt(value),
              },
            })
          }
        />

        <BrandTextInput
          label="Difficulty"
          value={newVote.breakdown.difficulty.toString()}
          onChange={(value) =>
            setNewVote({
              ...newVote,
              breakdown: { ...newVote.breakdown, difficulty: parseInt(value) },
            })
          }
        />

        <BrandButton onPress={submitVote} label="Submit Vote" />
      </div>
    </div>
  );
};

export default CocktailVotingPage;
// aroma: 0,
// taste: 0,
// creativity: 0,
// presentation: 0,
// difficulty: 0,
