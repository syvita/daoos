import moment from "moment";
import React from "react";
import { TProposal, TVoteSingle } from "../types";

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="py-2 flex justify-between text-sm font-medium">
    <dt className="text-gray-500">{label}</dt>
    <dd className="text-gray-900">{value}</dd>
  </div>
);

const DetailInformation: React.FC<{ proposal: TProposal<TVoteSingle> }> = ({
  proposal,
}) => {
  return (
    <dl className="mt-0 border-b border-gray-200 divide-y divide-gray-200">
      <Info label="Initiator" value={proposal.owner.name} />
      <Info
        label="Start Date"
        value={moment(proposal.postDate).format("MMM Do YY")}
      />
      <Info
        label="End Date"
        value={moment(proposal.expiryDate).format("MMM Do YY")}
      />
    </dl>
  );
};

export default DetailInformation;
