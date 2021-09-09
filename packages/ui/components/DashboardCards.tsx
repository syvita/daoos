import React from "react";
import { TProposalSummary } from "../types";
import { CardAvatars } from "./CardAvatars";
import { ProgressIndicator } from "./ProgressIndicator";
import { ProposalStatus } from "./ProposalStatus";

export const DashboardCards: React.FC<{ proposals: TProposalSummary[] }> = ({
  proposals,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <p className="text-sm mt-2 font-medium text-gray-900 truncate">
            {proposal.title}
          </p>

          <ProgressIndicator
            status={proposal.isClosed}
            actualVotes={proposal.votes}
            totalVotes={proposal.totalVotes}
          />

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={proposal.owner.imageUrl}
                alt=""
              />
            </div>

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
      ))}
    </div>
  );
};
