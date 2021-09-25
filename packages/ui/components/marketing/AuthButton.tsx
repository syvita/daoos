import React, { useEffect } from "react";
import { useAuth } from "../../lib/hooks/useAuth";
import { useLoading } from "../../lib/hooks/useLoading";
import { useUser } from "../../lib/hooks/useUser";
import { LOADING_KEYS } from "../../lib/store/ui";
import { useRouter } from "next/router";
import MvLoader from "../app/MvLoader";
import MvClientOnly from "../common/MvClientOnly";

const DASHBOARD_PATH = "/app";

const AuthButton = () => {
  const { authenticate } = useAuth();
  const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.AUTH);
  const { isSignedIn } = useUser();

  const { replace } = useRouter();
  const login = () => {
    setIsLoading(true);
    authenticate();
  };
  const gotoDash = () => {
    setIsLoading(true);
    replace(DASHBOARD_PATH);
  };
  return (
    <button
      onClick={!isSignedIn ? login : gotoDash}
      className="inline-flex items-center rounded-md bg-deep-pink 
      py-1.5 px-4 border border-transparent uppercase
      text-sm font-medium text-white hover:bg-blue-400"
    >
      {isLoading && (
        <div className="mr-2">
          <MvLoader />
        </div>
      )}
      {!isSignedIn ? "Connect" : "Dashboard"}
    </button>
  );
};

export default AuthButton;
