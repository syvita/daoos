import React from "react";
import { numberToPercent } from "../lib/utils";
import { ProposalStatus } from "./ProposalStatus";

export const ProgressIndicator: React.FC<{
  totalVotes: number;
  actualVotes: number;
  status: boolean;
}> = ({ totalVotes, actualVotes,status }) => {


  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-normal mr-2 inline-block py-1 px-2  rounded-full text-indigo-800 bg-indigo-200">
            {actualVotes}/{totalVotes} 
          </span>
          <ProposalStatus isClosed={status}/>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-indigo-600">
            {numberToPercent(actualVotes,totalVotes)}
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
        <div
          style={{ width: numberToPercent(actualVotes,totalVotes)}}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
        ></div>
      </div>
    </div>
  );
};
