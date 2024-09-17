"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";

interface Props {}

const MyCocktailsPage: NextPage<Props> = ({}) => {
  const router = useRouter();

  return (
    <div>
      <h1>My Cocktails</h1>
    </div>
  );
};

export default MyCocktailsPage;
