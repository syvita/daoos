import React from "react";
import { classNames } from "../lib/utils";

const ACTIVE='Active'
const CLOSED='Closed'

const StatusTag = ({ isClosed, label }) => {
  return (
    <span
      className={classNames(
        !isClosed
          ? "bg-yellow-100 text-yellow-800"
          : "bg-green-100 text-green-800",
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      )}
    >
      <svg
        className={classNames(
            !isClosed
              ? "text-yellow-400"
              : "text-green-400",
            "ml-0.5 mr-1.5 h-2 w-2"
          )}
        
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={3} />
      </svg>
      {label}
    </span>
  );
};

export const ProposalStatus: React.FC<{ isClosed: boolean }> = ({
  isClosed,
}) => {
  return (
    <StatusTag
      isClosed={isClosed}
      label={isClosed ? ACTIVE : CLOSED}
    />
  );
};
