import React, { useEffect } from "react";

import { userSession } from "../components/auth";
import PageHeading from "../components/PageHeading";

// Rough draft of what the logout page could look like
function Logout() {
  useEffect(() => {
    // Sign the user out
    userSession.signUserOut();

    // TODO: Redirect the user to the home/landing page
    window.location.href = "/login";
  }, []);

  return (
    <>
      {/* TODO: Add styling and proper layouts */}
      <PageHeading>Logging out...</PageHeading>
    </>
  );
}

export default Logout;
