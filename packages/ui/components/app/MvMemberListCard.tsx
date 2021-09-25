import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import Link from "next/link";
import React from "react";
import { selectedMemberAtom, slideOutPanelAtom } from "../../lib/store/ui";
import { TProfile } from "../../types";
import MemberCardStats from "./MvMemberCardStats";
import MvProfileDetail from "./MvProfileDetail";

const MemberListCard: React.FC<{
  member: TProfile;
}> = ({ member }) => {
  const [selectedMember, setMember] = useAtom(selectedMemberAtom);
  const setPanel = useUpdateAtom(slideOutPanelAtom);

  const onSelected = () => {
    setPanel({ show: true, component: MvProfileDetail, title: "Profile" });
    setMember(member);
  };

  return (
    <div
      key={member.id}
      className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    >
      <div className="flex-shrink-0">
        <img className="h-10 w-10 rounded-full" src={member.imageUrl} alt="" />
      </div>
      <div className="flex-1 space-y-2 min-w-0">
        <div className="border-b pb-2">
          <button
            onClick={onSelected}
            className="focus:outline-none  hover:text-indigo-500 text-sm font-medium text-gray-800  "
          >
            {member.name}
          </button>
        </div>

        <MemberCardStats id={member.id} />
      </div>
    </div>
  );
};

export default MemberListCard;
