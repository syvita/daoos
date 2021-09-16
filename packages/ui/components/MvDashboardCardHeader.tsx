import React, { MouseEventHandler } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  AnnotationIcon,
  DotsVerticalIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/solid";
import { classNames } from "../lib/utils";
import moment from "moment";
import { HandIcon } from "@heroicons/react/outline";
import { TProposalSummary, TVoteSingle } from "../types";

export const DashboardCardHeader: React.FC<{
  proposal: TProposalSummary<TVoteSingle>;
  onShowDetail?: (id: string) => void;
}> = ({ proposal, onShowDetail }) => {

  const handleShowDetail = (id: string) => () => {
    onShowDetail && onShowDetail(id);
  };

  return (
    <div className="bg-white px-0 py-0 sm:px-0">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={proposal.owner.imageUrl}
            alt="Owner picture "
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate text-gray-900">
            <a href="#" className="hover:underline">
              {proposal.title}
            </a>
          </p>
          <p className="text-xs text-gray-500">
            <a href="#" className="hover:underline">
              Closes {moment(proposal.expiryDate).fromNow()}
            </a>
          </p>
        </div>
        <div className="flex-shrink-0 self-center flex">
          <Menu as="div" className="relative z-30 inline-block text-left">
            <div>
              <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <HandIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Vote</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <AnnotationIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Comment</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={handleShowDetail(proposal.id)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <EyeIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>View</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <PencilIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Change</span>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
