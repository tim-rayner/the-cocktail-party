"use client";

import { useState } from "react";
import BrandButton from "../atoms/BrandButton";
import BrandTextInput from "../atoms/BrandTextInput";

import { Competitor } from "@/types/userTypes";
import { Cocktail } from "@/types/cocktailTypes";

type CreateCocktailFormProps = {
  currentCompetitor: Competitor;
  onCompleted: (cocktail: Cocktail) => void;
};

function CreateCocktailForm({
  currentCompetitor,
  onCompleted,
}: CreateCocktailFormProps) {
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailDescription, setCocktailDescription] = useState("");
  const [cocktailTheme, setCocktailTheme] = useState("");

  function handleOnCocktailCreated() {
    const newCocktail: Cocktail = {
      ownerClerkId: currentCompetitor?.user?.clerkId,
      partyId: currentCompetitor.partyId!,
      name: cocktailName,
      description: cocktailDescription,
      theme: cocktailTheme,
      ingredients: [],
      instructions: "",
      image: "",
      votes: [],
      createdAt: new Date().toISOString(),
    };

    console.log("emit create cocktail event", currentCompetitor, newCocktail);
    onCompleted(newCocktail);
  }

  return (
    <div>
      <h1 className="text-center">Create Cocktail</h1>
      <div className="form-container flex flex-col border w-fit p-20 mx-auto items-center">
        <BrandTextInput
          label="Cocktail Name"
          value={cocktailName}
          placeholder="Cocktail Name"
          onChange={setCocktailName}
        />
        <BrandTextInput
          label="Cocktail Description"
          value={cocktailDescription}
          placeholder="Cocktail Description"
          onChange={setCocktailDescription}
        />

        <BrandTextInput
          label="Cocktail theme"
          value={cocktailTheme}
          placeholder="Cocktail theme"
          onChange={setCocktailTheme}
        />

        <div className="mt-6 w-full">
          <BrandButton
            label="Create Cocktail"
            onPress={handleOnCocktailCreated}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateCocktailForm;
