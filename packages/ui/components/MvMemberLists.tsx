import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/utils";
import { TProfile } from "../types";
import MemberListCard from "./MvMemberListCard";

const MemberLists: React.FC = () => {
  const { data, error }: { data?: TProfile[]; error?: any } = useSWR(
    "./api/members",
    fetcher
  );
  return data && data.length ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {data.map((member) => (
        <MemberListCard member={member} />
      ))}
    </div>
  ) : (
    <>Loading</>
  );
};

export default MemberLists;
