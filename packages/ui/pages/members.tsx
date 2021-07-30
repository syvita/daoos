import React from "react";

import Search from "../components/Search";
import PageHeading from "../components/PageHeading";
import MemberGroup from "../components/MemberGroup";
import styles from "../styles/members.module.css";
import clsx from "clsx";

interface MembersProps {
  isMobile: boolean;
}

// Rough draft of what the members page could look like
function Members({ isMobile }: MembersProps) {
  return (
    <>
      {/* Will get replaced with DAO name from either GAIA or smart contract */}
      <PageHeading>Dao Name</PageHeading>
      <Search />
      <div
        className={clsx({
          [styles.memberGroupContainer]: !isMobile,
          [styles.memberGroupContainerMobile]: isMobile,
        })}
      >
        <MemberGroup groupName="Voting Members" isMobile={isMobile} />
        <MemberGroup groupName="Non-Voting Members" isMobile={isMobile} />
      </div>
    </>
  );
}

export default Members;
