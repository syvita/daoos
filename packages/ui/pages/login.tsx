import React, {useEffect} from "react";

import { Button } from "@material-ui/core";

import { authenticate } from "../components/auth";
import PageHeading from "../components/PageHeading";

interface LoginProps {
  isMobile: boolean;
}

// Rough draft of what the members page could look like
function Login({ isMobile }: LoginProps) {
  return (
    <>
      {/* TODO: Add styling and proper layouts */}
      <PageHeading>Welcome to DaoOS</PageHeading>
      <Button
				onClick={() => authenticate()}
			>
        Connect wallet
      </Button>
    </>
  );
}

export default Login;