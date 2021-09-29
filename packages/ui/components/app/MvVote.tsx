import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import React, { useEffect } from "react";
import { canPerformVoteAtom, selectedProposalAtom } from "../../lib/store/ui";
import { TProposal, TVoteSingle } from "../../types";
import { DetailVoteResults } from "./MvDetailVoteResults";
import MvVoteInputForm from "./MvVoteInputForm";

const MvVote = () => {
  const proposal = useAtomValue(selectedProposalAtom) as TProposal<TVoteSingle>;
  const canVote = useAtomValue(canPerformVoteAtom);

  const title = canVote ? "Cast Your Vote" : "Results";
  return (
    <>
      <h4 className=" font-semibold text-gray-700 bo border-b">{title}</h4>
      <div className="mt-2">
        {canVote ? (
          <MvVoteInputForm />
        ) : (
          <DetailVoteResults />
        )}
      </div>
    </>
  );
};

export default MvVote;
