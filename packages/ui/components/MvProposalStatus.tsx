import React from "react";
import Badge from "./MvBadge";

const ACTIVE = "Active";
const CLOSED = "Closed";
const CLOSED_COLOR = "lightGray";
const ACTIVE_COLOR = "indigo";

export const ProposalStatus: React.FC<{ isClosed: boolean }> = ({
  isClosed,
}) => {
  return (
    <Badge
      classnames="px-3 py-1"
      color={isClosed ? CLOSED_COLOR : ACTIVE_COLOR}
    >
      {isClosed ? ACTIVE : CLOSED}
    </Badge>
  );
};
