import React from "react";
import useSWR from "swr";
import { fetcher } from "../lib/utils";
import { TMemberStats } from "../types";
import Badge from "./MvBadge";
import MvWidgetLoader from "./MvWidgetLoader";

const MvStatsComponent: React.FC<{ label?: string; color?: string }> = ({
  children,
  label,
  color,
}) => (
  <a
    href="#"
    className="hover:font-semibold text-xs flex flex-shrink-0 font-normal text-gray-900"
  >
    {label}
    <Badge classnames="py-0 px-1 font-normal" color={color}>
      {" "}
      {children}
    </Badge>
  </a>
);

const MemberCardStats: React.FC<{ id: string }> = ({ id }) => {
  const { data, error }: { data?: TMemberStats; error?: any } = useSWR(
    `./api/members/${id}/stats`,
    fetcher
  );
  return (
    <>
      {!data && <MvWidgetLoader />}
      {data && (
        <div className="flex ">
          <MvStatsComponent label="Proposals:">
            {data.closedProposals + data.openProposals}
          </MvStatsComponent>
          <MvStatsComponent color="green" label="Active:">
            {data.openProposals}
          </MvStatsComponent>
          <MvStatsComponent color="lightGray" label="Closed:">
            {data.closedProposals}
          </MvStatsComponent>
        </div>
      )}
    </>
  );
};

export default MemberCardStats;
