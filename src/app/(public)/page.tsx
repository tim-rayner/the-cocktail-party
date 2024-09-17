"use client";

import Image from "next/image";
import cocktailGlass from "@/assets/cocktail-drink-glasses-free-svg-file.png";
import BrandButton from "@/components/atoms/BrandButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleSignInPress() {
    router.push("/sign-in");
  }
  function handleRegisterPress() {
    router.push("sign-up");
  }

  return (
    <div className="home max-w-[1200px] mx-auto">
      <div className="title-content w-fit mx-auto items-center content-center p-20">
        <Image
          src={cocktailGlass}
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          className="mx-auto"
        />
        <h1 className="text-center"> The Cocktail Party </h1>
      </div>

      <div className="form-content flex flex-col w-1/2 mx-auto gap-y-6">
        <BrandButton label="Sign in" onPress={handleSignInPress} />
        <BrandButton label="Register" onPress={handleRegisterPress} />
      </div>
    </div>
  );
}
