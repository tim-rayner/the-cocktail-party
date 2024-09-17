import { NextPage } from "next";

interface Props {}

const RulesPage: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col">
      <h1>Rules Page</h1>
      <p>The rules are simple.</p>
      <ol className="list-decimal list-inside">
        <li>Make a themed cocktail according to the theme of the party</li>
        <li>
          Join your hosts
          <span className="text-blue-800 font-bold"> Cocktail Party</span>
        </li>
        <li>
          For each cocktail listed, you must leave a score out of 10 for each
          scoring category
          <ul className="list-disc list-inside">
            <li>
              <p>Appearance</p>
            </li>
            <li>
              <p>Smell</p>
            </li>
            <li>
              <p>Taste</p>
            </li>
            <li>
              <p>Originality</p>
            </li>
          </ul>
        </li>
        <li> Submit your final scores</li>
        <li>Winner will be announced</li>

        <li>Have fun</li>

        <li>What happens at the cocktail party stays at the cocktail party </li>
        <li>Dont talk about the cocktail party</li>
      </ol>
    </div>
  );
};

export default RulesPage;
