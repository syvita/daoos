import React from "react";
import { TVoteSingle, TVote } from "../../types";
import Badge from "./MvBadge";

const ListComponent: React.FC<{ vote: TVote<TVoteSingle> }> = ({ vote }) => (
  <li className="py-2 flex justify-between items-center">
    <div className="flex items-center">
      <img src={vote.voter.imageUrl} alt="" className="w-8 h-8 rounded-full" />
      <p className="ml-4 text-sm font-medium text-gray-900">
        {vote.voter.name}
        <a href="#" className="block w-36 text-xs font-light truncate">
          {vote.onChainLink}
        </a>
      </p>
    </div>
    <div className="flex-shrink-0">
      <Badge
        classnames="px-2 py-0 w-10 text-center"
        color={vote.vote.yes ? "purple" : "indigo"}
      >
        {vote.vote.yes ? "Yes" : "No"}
      </Badge>
    </div>
  </li>
);

const DetailVoteList: React.FC<{ votes: TVote<TVoteSingle>[] }> = ({
  votes,
}) => {
  return (
    <ul
      role="list"
      className="mt-2  border-b border-gray-200 divide-y divide-gray-200"
    >
      {votes.map((vote) => (
        <ListComponent vote={vote} />
      ))}
    </ul>
  );
};

export default DetailVoteList;
