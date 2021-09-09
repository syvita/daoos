import React from "react";
import { useFaker } from "react-fakers";
import { ddOptionsForProposal, fetcher, prepareMockUrl } from "../lib/utils";
import { TProfile, TProposalSummary } from "../types";
import useSWR from "swr";
import { DashboardCards } from "./DashboardCards";
export const Dashboard = () => {
  const { data, error } = useSWR("./api/mock-data", fetcher);
  return (
    <>
      {!data && <h4>Loading....</h4>}
      {data && <DashboardCards proposals={data}/>}
        
    </>
  );
};
