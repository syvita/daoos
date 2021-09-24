import { showConnect } from "@stacks/connect";
import { appDetailAtom } from "./store/ui";

export const authenticate=()={return showConnect({
    appDetails: appDetailAtom,
    redirectTo: '/',
    onFinish: () => {
      let userData = userSession.loadUserData();
      // Save or otherwise utilize userData post-authentication
    },
    userSession: userSession,
  });