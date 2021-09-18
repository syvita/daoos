import React, { MouseEventHandler } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  AnnotationIcon,
  DotsVerticalIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/solid";
import { classNames } from "../lib/utils";
import moment from "moment";
import { HandIcon } from "@heroicons/react/outline";
import { TProposalSummary, TVoteSingle } from "../types";
import Badge from "./MvBadge";
import { ProposalStatus } from "./MvProposalStatus";

export const DashboardCardHeader: React.FC<{
  proposal: TProposalSummary<TVoteSingle>;
  onShowDetail?: (id: string) => void;
}> = ({ proposal, onShowDetail }) => {
  const handleShowDetail = (id: string) => () => {
    onShowDetail && onShowDetail(id);
  };

  return (
    <div className="bg-white px-0 py-0 sm:px-0">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={proposal.owner.imageUrl}
            alt="Owner picture "
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate text-gray-900">
            <a href="#" className="hover:underline">
              {proposal.title}
            </a>
          </p>
          <p className="text-xs text-gray-500">
            <a href="#" className="hover:underline">
              Closes {moment(proposal.expiryDate).fromNow()}
            </a>
          </p>
        </div>
        <div className="flex-shrink-0 self-center flex">
          <ProposalStatus isClosed={proposal.isClosed} />
        </div>
      </div>
    </div>
  );
};
