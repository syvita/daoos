import React from "react";
import { useFaker } from "react-fakers";
import { ddOptionsForProposal, fetcher, prepareMockUrl } from "../lib/utils";
import { TProfile, TProposalSummary } from "../types";
import useSWR from "swr";
import { DashboardCard } from "./DashboardCards";
export const Dashboard: React.FC<{ onShowDetail?: (id: string) => void }> = ({
  onShowDetail,
}) => {
  const { data, error } = useSWR("./api/mock-server", fetcher);
  return (
    <>
      {!data && <h4>Loading....</h4>}
      {data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.map((proposal) => (
            <DashboardCard onShowDetail={onShowDetail} proposal={proposal} />
          ))}
        </div>
      )}
    </>
  );
};
