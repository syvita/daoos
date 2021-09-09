import React from "react";
import { TProposalSummary } from "../types";
import { CardAvatars } from "./CardAvatars";
import { DashboardCardHeader } from "./DashboardCardHeader";
import { ProgressIndicator } from "./ProgressIndicator";

const DashboardCard = (proposal: TProposalSummary) => (
  <div
    key={proposal.id}
    className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
  >
    <DashboardCardHeader
      postDate={proposal.postDate}
      title={proposal.title}
      avatar={proposal.owner.imageUrl}
    />
    <ProgressIndicator
      status={proposal.isClosed}
      actualVotes={proposal.votes}
      totalVotes={proposal.totalVotes}
    />

    <div className="flex items-start space-x-3">
      

      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />

          <p className="text-sm text-gray-500 line-clamp-3">
            {proposal.description}
          </p>
          <CardAvatars avatars={proposal.avatars} />
        </div>
      </div>
    </div>
  </div>
);

export const DashboardCards: React.FC<{ proposals: TProposalSummary[] }> = ({
  proposals,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {proposals.map((proposal) => DashboardCard(proposal))}
    </div>
  );
};
