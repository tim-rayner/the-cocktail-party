import Image from "next/image";
import cocktailGlass from "@/assets/cocktail-drink-glasses-free-svg-file.png";
import LoginForm from "@/components/organisms/LoginForm";

export default function Home() {
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
        <h1> Welcome to the Cocktail Party </h1>
      </div>

      <div className="form-content">
        <LoginForm />
      </div>
    </div>
  );
}
