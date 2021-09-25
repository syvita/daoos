import React from "react";
import moment from "moment";
import { TProposalSummary, TVoteSingle } from "../../types";
import { ProposalStatus } from "./MvProposalStatus";
import MvAvatar from "../common/MvAvatar";
import { iconColors, iconSizes } from "../../lib/constants";

export const DashboardCardHeader: React.FC<{
  proposal: TProposalSummary<TVoteSingle>;
}> = ({ proposal }) => {
  return (
    <div className="bg-white px-0 py-0 sm:px-0">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <MvAvatar
            colorInner={iconColors.avatar.inner_yellow}
            color={iconColors.avatar.yellow}
            size={iconSizes.md}
            name={proposal.owner.name}
            isText
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate text-gray-900">
            <a href="#" className="hover:underline">
              {proposal?.title}
            </a>
          </p>
          <p className="text-xs text-gray-500">
            <a href="#" className="hover:underline">
              Closes {moment(proposal?.expiryDate).fromNow()}
            </a>
          </p>
        </div>
        <div className="flex-shrink-0 self-center flex">
          <ProposalStatus isClosed={proposal?.isClosed} />
        </div>
      </div>
    </div>
  );
};
