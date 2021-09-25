import React from "react";
import { algoliaClient, fetcher } from "../../lib/utils";
import useSWR from "swr";
import { DashboardCard } from "./MvDashboardCard";
import MvSectionHeader from "./MvSectionHeader";
import { TProposal, TProposalSummary, TVoteSingle } from "../../types";
import MvLoader from "./MvLoader";
import { Configure, connectHits, InstantSearch } from "react-instantsearch-dom";

const LINK_TITLE = "Create new proposal";
const LINK = "/app/proposals/add";
const API_LINK = "./api/proposals";

const DashboardItems = connectHits(({ hits }) => {
  return hits && hits.length ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {hits.map((proposal) => (
        <DashboardCard key={proposal.objectID} proposal={proposal as any} />
      ))}
    </div>
  ) : (
    <MvLoader isPage />
  );
});

export const Dashboard: React.FC = () => {
  return (
    <>
      <MvSectionHeader link={LINK} linkTitle={LINK_TITLE} />
      <InstantSearch
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_DEFAULT_INDEX}
        searchClient={algoliaClient()}
      >
        <Configure filters={'proposal'} />
        {<DashboardItems />}
      </InstantSearch>
    </>
  );
};
