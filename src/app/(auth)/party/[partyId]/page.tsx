import { NextPage } from "next";

interface Props {
  params: { partyId: string };
}

const PartyHomePage: NextPage<Props> = ({ params }) => {
  return (
    <div>
      <h1>Party Home Page</h1>
      <p>Party ID: {params.partyId}</p>
    </div>
  );
};

export default PartyHomePage;
