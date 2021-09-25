import React from "react";
import { Configure, connectHits, InstantSearch } from "react-instantsearch-dom";
import { algoliaClient } from "../../lib/utils";
import MvLoader from "./MvLoader";
import MemberListCard from "./MvMemberListCard";
import MvSectionHeader from "./MvSectionHeader";

const LINK_TITLE = "Return to proposals";
const LINK = "/app";

const MemberList = connectHits(({ hits }) => {
  return hits && hits.length ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {hits.map((member) => (
        <MemberListCard key={member.objectID} member={member as any} />
      ))}
    </div>
  ) : (
    <MvLoader isPage />
  );
});

const MemberLists: React.FC = () => {
  return (
    <>
      <MvSectionHeader link={LINK} linkTitle={LINK_TITLE} />
      <InstantSearch
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_DEFAULT_INDEX}
        searchClient={algoliaClient()}
      >
        <Configure filters={"profile"} />
        <MemberList />
      </InstantSearch>
    </>
  );
};

export default MemberLists;
