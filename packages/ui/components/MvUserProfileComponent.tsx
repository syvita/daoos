import Link from "next/link";
import React from "react";
import { TProfile } from "../types";

const MvUserProfileComponent: React.FC<{ profile: TProfile }> = ({
  profile,
}) => {
  return (
    <div className="flex-shrink-0 flex bg-gray-700 p-4">
      <button className="flex-shrink-0 w-full group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={profile.imageUrl}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{profile.name}</p>
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
