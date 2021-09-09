import { AppConfig, UserSession, showConnect } from "@stacks/connect";
// import { Storage } from '@stacks/storage';
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import {
  callReadOnlyFunction,
  cvToJSON,
  standardPrincipalCV,
} from "@stacks/transactions";

// Initialize Gaia hub permissions for the user
const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });
// export const storage = new Storage({ userSession });

// Return the network type object for the current network in use
export function networkType() {
  if (process.env.IS_NETWORK_MAINNET === "true") return new StacksMainnet();
  else return new StacksTestnet();
}

export function getMyStxAddress(): string {
  if (process.env.IS_NETWORK_MAINNET === "true") return userSession.loadUserData().profile.stxAddress.mainnet;
  else return userSession.loadUserData().profile.stxAddress.testnet;
}

export function getNetworkName(): string {
  if (process.env.IS_NETWORK_MAINNET === "true") return "mainnet";
  else return "testnet";
}

export function authenticate(): void {
  showConnect({
    appDetails: {
      name: "daoOS",
      // TODO: add daoOS logo over here
      icon: "../public/favicon.ico",
    },
    redirectTo: "/",
    onFinish: () => {
      // TODO: Enter miami vice's contract address
      const contractAddress: string = "SP98329831323123";
      // TODO: Enter miami vice's contract name
      const contractName: string = "miami-vice-v1";

      const functionName: string = "is-dao-member";
      const stxAddress: string = getMyStxAddress();
      const principalArg = standardPrincipalCV(stxAddress);

      const options = {
        contractAddress,
        contractName,
        functionName,
        functionArgs: [principalArg],
        network: networkType(),
        senderAddress: stxAddress,
      };

      // TODO: Remove this multiline comment when the testnet contract is deployed
      //       and resolve the rest of the TODO in this comment block
      /*
      callReadOnlyFunction(options)
        .then((clarityValue) => {
          const jsonValue = cvToJSON(clarityValue);

          // TODO: check that the right type is compared
          if (jsonValue.type === "(response bool)") {
            // TODO: console log and check whether the right argument is used as boolean
            const isMember: boolean = jsonValue.value["is-member"].value;

            if (isMember) {
              // Allow access to the miami dashboard
              // TODO: add redirect to miami dashboard
              window.location.replace(window.location.origin + "/");
            } else {
              // Deny access
              // TODO: add redirect to register page
              window.location.replace(window.location.origin + "/register");
            }
          }
        })
        .catch((error) => {
          // TODO: any error handling such as the contract or the function doesn't exist
          console.log(error.message);
        });
      */
    },
    userSession: userSession,
  });
}

export const handleLogout = () => {
  // Sign the user out
  userSession.signUserOut();

  // TODO: Redirect the user to the home/landing page
  window.location.href = "/login";
}