import { LogoutIcon } from "@heroicons/react/outline";
import React from "react";
import { useUser } from "../../lib/hooks/useUser";
import { useUserSession } from "../../lib/hooks/useUserSession";

const MvLogOutBtn = () => {
    const userSession=useUserSession()
  return (
    <a onClick={()=>userSession.signUserOut('/')} className="cursor-pointer text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
      <LogoutIcon
        className=" mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      <span className="flex-1">Signout</span>
    </a>
  );
};

export default MvLogOutBtn;
