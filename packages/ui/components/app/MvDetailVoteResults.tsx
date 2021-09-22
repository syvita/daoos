import React from "react";
import { TVoteSingle, TVote } from "../../types";
import { ProgressIndicator } from "./MvProgressIndicator";

export const DetailVoteResults: React.FC<{ votes: TVote<TVoteSingle>[] }> = ({
  votes,
}) => {
  const totalVotes = votes.length;
  const yesVotes = votes.filter((vote) => vote.vote.yes).length;
  const noVotes = totalVotes - yesVotes;
  return (
    <div>
      <div>
        <ProgressIndicator
          label="Yes"
          color="purple"
          actual={yesVotes}
          total={totalVotes}
        />
      </div>
      <div>
        <ProgressIndicator
          label="No"
          color="indigo"
          actual={noVotes}
          total={totalVotes}
        />
      </div>
      <button type="button" className="btn text-center w-full">
        Vote
      </button>
    </div>
  );
};
