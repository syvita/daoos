import link from "next/link";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/utils";
import { TProfile } from "../types";
import MemberListCard from "./MvMemberListCard";
import MvSectionHeader from "./MvSectionHeader";

const LINK_TITLE = "Return to proposals";
const LINK = "/";

const MemberLists: React.FC<{ onMemberSelect?: (payload:string) => void }> = ({
  onMemberSelect,
}) => {
  const { data, error }: { data?: TProfile[]; error?: any } = useSWR(
    "./api/members",
    fetcher
  );
  return (
    <>
      <MvSectionHeader link={LINK} linkTitle={LINK_TITLE} />
      {data && data.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.map((member) => (
            <MemberListCard
              onMemberSelect={onMemberSelect}
              key={member.id}
              member={member}
            />
          ))}
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default MemberLists;
