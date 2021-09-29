import React from "react";
import { TProposal, TVoteSingle } from "../../types";
import { Parser } from "html-to-react";
import { DetailVoteResults } from "./MvDetailVoteResults";
import DetailVoteList from "./MvDetailVoteList";
import DetailInformation from "./MvDetailInformation";
import Badge from "./MvBadge";
import MvLoader from "./MvLoader";
import { selectedProposalAtom } from "../../lib/store/ui";
import { useAtomValue } from "jotai/utils";
import MvVote from "./MvVote";
const ProposalDetailComponent: React.FC<{ proposal: TProposal<TVoteSingle> }> =
  ({ proposal }) => {
    return (
      <>
        <div>{Parser().parse(proposal.body)}</div>
        <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
          <h3 className="font-medium text-gray-900">Results</h3>
          <DetailVoteResults />
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

export const ProposalDetail: React.FC = () => {
  //Todo load data from Gaia
  //const { data, error } = useSWR(`./api/proposals/${id}`, fetcher);

  const data = useAtomValue(selectedProposalAtom) as TProposal<TVoteSingle>;
  return !data ? (
    <MvLoader />
  ) : (
    <>
      <h3 className="font-bold text-gray-700 ">{data.title}</h3>
      <span className="mt-1 inline-block text-sm  text-gray-800 sm:col-span-2 ">
        {Parser().parse(data.body)}
      </span>
      <div>
      <MvVote/>
          
        
      </div>
      <div>
        <h3 className=" font-semibold text-gray-700 bo border-b">
          Votes
          <Badge color={"gray"} classnames="py-0 mb-2 ml-1 py-0 px-1">
            {data?.votes?.length}
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
