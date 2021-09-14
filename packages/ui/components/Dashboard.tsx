import React from "react";
import { fetcher } from "../lib/utils";
import useSWR from "swr";
import { DashboardCard } from "./DashboardCard";
export const Dashboard: React.FC<{ onShowDetail?: (id: string) => void }> = ({
  onShowDetail,
}) => {
  const { data, error } = useSWR("./api/proposals", fetcher);
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
