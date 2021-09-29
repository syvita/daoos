import { ArrowRightIcon } from "@heroicons/react/outline";
import { atom, useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import React from "react";
import { useSlideOut } from "../../lib/hooks/useSlideOut";
import { selectedProposalAtom } from "../../lib/store/ui";
import { TProposalSummary, TVoteSingle } from "../../types";
import { CardAvatars } from "./MvCardAvatars";
import MvDashboardCardBody from "./MvDashboardCardBody";
import { DashboardCardHeader } from "./MvDashboardCardHeader";
import MvProfileDetail from "./MvProfileDetail";
import { ProposalDetail } from "./MvProposalDetail";

export const DashboardCard: React.FC<{
  proposal: TProposalSummary<TVoteSingle>;
}> = ({ proposal }) => {
  const { setPanel } = useSlideOut();
  const setSelected=useUpdateAtom(selectedProposalAtom)
  const onSelected = () => {
    setSelected(proposal)
    setPanel({ show: true, component: ProposalDetail, title: proposal.title });
  };
  return (
    <div
      key={proposal.objectID}
      className="relative rounded-lg border border-gray-300
       bg-white px-6 py-5 shadow-sm hover:border-gray-400
        focus-within:ring-2 focus-within:ring-offset-2 
        focus-within:ring-indigo-500"
    >
      <DashboardCardHeader proposal={proposal} />
      <MvDashboardCardBody onSelected={onSelected} proposal={proposal} />
    </div>
  );
};
