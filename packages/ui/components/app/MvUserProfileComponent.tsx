import Link from "next/link";
import React from "react";
import { useUser } from "../../lib/hooks/useUser";
import { TProfile } from "../../types";

const MvUserProfileComponent: React.FC = () => {
  const {profile}=useUser()
  console.log(profile)
  
  //const _profile = extractProfile()
  console.log(profile)
  return (
    <div className="flex-shrink-0 flex bg-gray-700 p-4">
      <button className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={profile?.data?.imageUrl}
              alt=""
            />
          </div>
          <div className=" ml-3">
            <p className="text-sm w-40 truncate font-medium text-white">{profile?.data?.name}</p>
            <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
              View profile
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MvUserProfileComponent;
