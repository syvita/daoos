import { ArrowRightIcon } from "@heroicons/react/outline";
import React from "react";
import { TProposalSummary, TVoteSingle } from "../../types";
import { CardAvatars } from "./MvCardAvatars";
import { DashboardCardHeader } from "./MvDashboardCardHeader";
import { ProgressIndicator } from "./MvProgressIndicator";

export const DashboardCard: React.FC<{
  proposal: TProposalSummary<TVoteSingle>;
  onShowDetail: (id: string) => void;
}> = ({ proposal, onShowDetail }) => (
  <div
    key={proposal.id}
    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
  >
    <DashboardCardHeader proposal={proposal} onShowDetail={onShowDetail} />
    
    <div className=" min-w-0">
      <div className="focus:outline-none">
        <span className="absolute inset-0" aria-hidden="true" />

        <p className="text-sm text-gray-500 line-clamp-3">
          {proposal.summary}
        </p>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <CardAvatars avatars={proposal.votes.map(item=>item.voter)} />
          </div>
          <button
            onClick={() => onShowDetail && onShowDetail(proposal.id)}
            className="relative inline-flex items-center px-1 py-1  rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
