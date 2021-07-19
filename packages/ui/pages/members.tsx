import React from "react";

import Search from "../components/Search";
import PageHeading from "../components/PageHeading";
import MemberGroup from "../components/MemberGroup";
import styles from "../styles/members.module.css";

function Members() {
  return (
    <>
      {/* Will get replaced with DAO name from either GAIA or smart contract */}
      <PageHeading>Dao Name</PageHeading>
      <Search />
      <div className={styles.memberGroupContainer}>
        <MemberGroup groupName="Voting Members" />
        <MemberGroup groupName="Non-Voting Members" />
      </div>
    </>
  );
}

export default Members;
