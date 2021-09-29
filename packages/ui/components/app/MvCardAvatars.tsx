import React from "react";
import { selectedProposalAtom } from "../../lib/store/ui";
import { TProfile, TProposal, TVote, TVoteSingle } from "../../types";
import Badge from "./MvBadge";
import { useAtomValue } from "jotai/utils";

export const CardAvatars: React.FC<{votes:TVote<TVoteSingle>[]}> = ({votes}) => {
  const avatars = votes?.map((vote) => vote.voter);

  return (
    <div className="mt-2 flex-shrink-0 sm:mt-2 sm:ml-0">
      <div className="flex overflow-hidden -space-x-1">
        {avatars?.length ? (
          avatars.map((applicant, key) => (
            <img
              key={key}
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src='/avatar-place-holder.jpg'
              alt={applicant?.name}
            />
          ))
        ) : (
          <Badge classnames="py-0.5 px-3" color="red">
            0 votes
          </Badge>
        )}
      </div>
    </div>
  );
};
