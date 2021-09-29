import React, {  } from "react";
import { TProfile } from "../../types";
import Link from "next/link";
import { Parser } from "html-to-react";


export const MvProfileDetailComponent: React.FC<{ profile: TProfile,onEdit:()=>void }> = ({
  profile,onEdit
}) => {
  return (
    <div>
      <div className="pb-1 sm:pb-6">
        <div>
          <div className="relative h-40 sm:h-56">
            <img
              className="absolute h-full w-full object-cover"
              src={profile.imageUrl}
              alt=""
            />
          </div>
          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
            <div className="sm:flex-1">
              <div>
                <div className="flex items-center">
                  <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">
                    {profile.name}
                  </h3>
                  <span className="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
                    <span className="sr-only">Online</span>
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={onEdit}
                    type="button"
                    className="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1"
                  >
                    Edit
                  </button>
                </div>
                <Link href={profile.profileLink || "#"}>
                  <a className="text-xs text-blue-500 truncate">
                    {profile.objectID}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
        <dl className="space-y-8 px-4 sm:px-6 sm:space-y-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
              Bio
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              <p>{Parser().parse(profile.bio)}</p>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
              Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              {profile.email}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
