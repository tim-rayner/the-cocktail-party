"use client";

import { NextPage } from "next";

interface Props {
  params: { cocktailId: string };
}

const CocktailVotingPage: NextPage<Props> = ({ params }) => {
  return (
    <div>
      <h1> Cocktail {params.cocktailId} screen </h1>
    </div>
  );
};

export default CocktailVotingPage;
