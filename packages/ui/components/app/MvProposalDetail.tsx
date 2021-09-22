import React from "react";
import { TProposal, TVoteSingle } from "../../types";
import { Parser } from "html-to-react";
import { DetailVoteResults } from "./MvDetailVoteResults";
import DetailVoteList from "./MvDetailVoteList";
import DetailInformation from "./MvDetailInformation";
import useSWR from "swr";
import { fetcher } from "../../lib/utils";
import { getVotes } from "../../lib/mock-utils";
import Badge from "./MvBadge";
const ProposalDetailComponent: React.FC<{ proposal: TProposal<TVoteSingle> }> =
  ({ proposal }) => {
    return (
      <>
        <div>{Parser().parse(proposal.body)}</div>
        <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
          <h3 className="font-medium text-gray-900">Results</h3>
          <DetailVoteResults votes={proposal.votes} />
        </div>
        <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
          <h3 className="font-medium text-gray-900">Votes</h3>
          <DetailVoteList votes={proposal.votes} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Information</h3>
          <DetailInformation proposal={proposal} />
        </div>
      </>
    );
  };

export const ProposalDetail: React.FC<{ id: string }> = ({ id }) => {
  const { data, error } = useSWR(`./api/proposals/${id}`, fetcher);

  return !data ? (
    <h4>Loading....</h4>
  ) : (
    <>
      <h3 className="font-bold text-gray-700 ">{data.title}</h3>
      <span className="mt-1 inline-block text-sm  text-gray-800 sm:col-span-2 ">
        {Parser().parse(data.body)}
      </span>
      <div>
        <h4 className=" font-semibold text-gray-700 bo border-b">Results</h4>
        <div className="mt-2">
          <DetailVoteResults votes={data.votes} />
        </div>
      </div>
      <div>
        <h3 className=" font-semibold text-gray-700 bo border-b">
          Votes
          <Badge color={"gray"} classnames="py-0 mb-2 ml-1 py-0 px-1">
            {data.votes.length}
          </Badge>
        </h3>
        <DetailVoteList votes={data.votes} />
      </div>
      <div>
        <h3 className=" font-semibold text-gray-700 bo border-b">
          Information
        </h3>
        <DetailInformation proposal={data} />
      </div>
    </>
  );
};
