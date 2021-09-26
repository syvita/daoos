import { useAtomValue } from "jotai/utils";
import React from "react";
import { canPerformVoteAtom, selectedProposalAtom } from "../../lib/store/ui";
import { TVoteSingle, TVote, TProposal } from "../../types";
import { ProgressIndicator } from "./MvProgressIndicator";

export const DetailVoteResults = () => {
  const proposal = useAtomValue(selectedProposalAtom) as TProposal<TVoteSingle>;
  const canVote = useAtomValue(canPerformVoteAtom);
  const totalVotes = proposal.votes.length;
  const yesVotes = proposal.votes.filter((vote) => vote.vote.yes).length;
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
      <button
        disabled={!canVote}
        type="button"
        className=" disabled:bg-red-100 disabled:cursor-not-allowed 
        disabled:text-indigo-800   btn text-center w-full"
      >
        {canVote ? "Vote" : "You can no longer vote!"}
      </button>
    </div>
  );
};
