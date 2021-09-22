import React from "react";
import { fetcher } from "../../lib/utils";
import useSWR from "swr";
import { DashboardCard } from "./MvDashboardCard";
import MvSectionHeader from "./MvSectionHeader";
import { TProposal, TProposalSummary, TVoteSingle } from "../../types";

const LINK_TITLE = "Create new proposal";
const LINK = "/proposals/add";
const API_LINK = "./api/proposals";

export const Dashboard: React.FC<{ onShowDetail?: (id: string) => void }> = ({
  onShowDetail,
}) => {
  const { data, error } = useSWR(API_LINK, fetcher);
  return (
    <>
      <MvSectionHeader link={LINK} linkTitle={LINK_TITLE} />
      {!data && <h4>Loading....</h4>}
      {data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.map((proposal: TProposalSummary<TVoteSingle>) => (
            <DashboardCard
              key={proposal.id}
              onShowDetail={onShowDetail}
              proposal={proposal}
            />
          ))}
        </div>
      )}
    </>
  );
};
