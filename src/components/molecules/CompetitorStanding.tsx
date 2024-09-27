import { Competitor } from "@/types/userTypes";

type CompetitorStandingProps = {
  competitor: Competitor;
  score: number;
  position: number;
  onClicked?: () => void;
};

const CompetitorStanding = ({
  competitor,
  position,
  score,
  onClicked,
}: CompetitorStandingProps) => {
  //curate total score by combining all the scores in the breakdown object

  return (
    <div
      className="flex items-center justify-between py-2 border-b border-gray-300"
      onClick={onClicked}
    >
      <div className="flex items-center">
        <p className="font-bold text-lg">{position}</p>
        {/* <img
          src={competitor.user.avatar}
          alt={competitor.user.username}
          className="w-10 h-10 rounded-full ml-4"
        /> */}
        <p className="ml-4">{competitor.user.username}</p>
      </div>
      <p className="font-bold text-lg">
        {competitor.score ? competitor.score : 0}
      </p>
    </div>
  );
};

export default CompetitorStanding;
