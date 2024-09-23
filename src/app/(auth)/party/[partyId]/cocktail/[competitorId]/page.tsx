"use client";

import { NextPage } from "next";

interface Props {
  params: { competitorId: string; partyId: string };
}

const CocktailVotingPage: NextPage<Props> = ({ params }) => {
  console.log("CocktailVotingPage", params);

  return (
    <div>
      <h1>
        {" "}
        Cocktail created for {params.competitorId} for party {params.partyId}
      </h1>
    </div>
  );
};

export default CocktailVotingPage;
