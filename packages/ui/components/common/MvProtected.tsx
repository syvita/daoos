import React from "react";
import { useUser } from "../../lib/hooks/useUser";
import MvLoader from "../app/MvLoader";
import MvRedirect from "./MvRedirect";

const MvProtected = ({ children }) => {
  const { isSignedIn } = useUser();

  return isSignedIn ? <>{children}</> : <MvRedirect path="/" />;
};

export default MvProtected;
