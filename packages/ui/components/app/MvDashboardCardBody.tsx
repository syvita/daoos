import { ArrowRightIcon } from "@heroicons/react/outline";
import React from "react";
import { TProposal, TProposalSummary, TVoteSingle } from "../../types";
import { CardAvatars } from "./MvCardAvatars";

const MvDashboardCardBody: React.FC<{
  proposal: TProposalSummary<TVoteSingle>;
  onSelected?: () => void;
}> = ({ proposal, onSelected }) => {
  return (
    <div className=" min-w-0">
      <div className="focus:outline-none">
        <span className="absolute inset-0" aria-hidden="true" />

        <p className="text-sm text-gray-500 line-clamp-3">{proposal.summary}</p>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <CardAvatars votes={proposal.votes} />
          </div>
          <button
            onClick={onSelected}
            className="relative inline-flex items-center px-1 py-1
                rounded-full border border-gray-300 bg-white text-sm 
                font-medium text-gray-500 hover:bg-gray-50"
          >
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MvDashboardCardBody;
