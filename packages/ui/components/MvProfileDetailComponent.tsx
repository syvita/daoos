import React, { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { TProfile } from "../types";
import Link from "next/link";
import MvBadge from "./MvBadge";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// Stats widget for profile detail view
/*const ProfileStatsWidget = (profile:TProfile) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
        Proposals
      </h3>
      <div className='grid grid-cols-3 justify-items-stretch'>
          <MvBadge color='lightGray' classnames='py-2 px-1'>Total:</MvBadge>
      </div>
    </div>
  );
};*/

export const MvProfileDetailComponent: React.FC<{ profile: TProfile }> = ({
  profile,
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
                <Link href={profile.profileLink || "#"}>
                  <a className="text-xs text-blue-500 truncate">{profile.id}</a>
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
              <p>{profile.bio}</p>
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
