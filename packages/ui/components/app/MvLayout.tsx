import { Transition, Dialog } from "@headlessui/react";
import { XIcon, MenuIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { getProfile } from "../../lib/mock-utils";
import { classNames, isCurrentLink, navigation } from "../../lib/utils";
import { TProfile } from "../../types";
import MvProtected from "../common/MvProtected";
import { SideNavBar } from "./MvSideNavBar";
import { ToastContainer } from "react-nextjs-toast";
import { useSlideOut } from "../../lib/hooks/useSlideOut";
import { SlideOver } from "./MvSlideOver";
import Link from "next/link";
import MvUserProfileComponent from "./MvUserProfileComponent";
import MvClientOnly from "../common/MvClientOnly";

export const Layout: React.FC<{ title?: string; isProtected?: boolean }> = ({
  children,
  title,
  isProtected,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { panel, setPanel } = useSlideOut();
  const profile: TProfile = getProfile("user-id");
  const router = useRouter();
  return (
    <MvClientOnly>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-14  w-auto"
                      src="/Mvlogo.svg"
                      alt="MiamiVoice"
                    />
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          key={item.name}
                          className={classNames(
                            isCurrentLink(router, item.href)
                              ? "bg-blue-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              isCurrentLink(router, item.href)
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-3 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          <span className="flex-1">{item.name}</span>
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
                
                  <MvUserProfileComponent />
               
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <SideNavBar profile={profile} navigation={navigation} />
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center j
            ustify-center rounded-md text-gray-500 hover:text-gray-900 
            focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {title}
                </h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <ToastContainer />
                <div className="py-4">
                  <MvProtected>{children}</MvProtected>
                </div>
                <SlideOver
                  onClose={() => {
                    setPanel({ show: false });
                  }}
                  show={panel.show}
                  title={panel.title}
                >
                  {panel?.component && <panel.component />}
                </SlideOver>
              </div>    
            </div>
          </main>
        </div>
      </div>
      </MvClientOnly>
  );
};

Layout.defaultProps = {
  isProtected: true,
};
