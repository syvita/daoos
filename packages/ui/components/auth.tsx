
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
// import { Storage } from '@stacks/storage';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

// Initialize Gaia hub permissions for the user
const appConfig = new AppConfig(['store_write', 'publish_data']);

// Set this to true if you want to use Mainnet
// Using a boolean helps to switch the entire application to mainnet
// or testnet with only changing a single value
const isNetworkMainnet = true; 

export const userSession = new UserSession({ appConfig });
// export const storage = new Storage({ userSession });

// Return the network type object for the current network in use
export function networkType() {
  if(isNetworkMainnet)
    return new StacksMainnet();
  else 
    return new StacksTestnet();
}

export function getMyStxAddress(): string {
  if(isNetworkMainnet)
    return getUserData().profile.stxAddress.mainnet;
  else 
    return getUserData().profile.stxAddress.testnet;
}

export function getNetworkName(): string {
  if(isNetworkMainnet)
    return "mainnet";
  else 
    return "testnet";
}

export function authenticate(): void {
  showConnect({
    appDetails: {
      name: 'daoOS',
      // TODO: add daoOS logo over here
      icon: './public/favicon.ico',
    },
    redirectTo: '/',
    onFinish: () => {
      const stxAddress: string = getMyStxAddress();
      const networkName: string = getNetworkName();
      const numberOfMiamiCoinsRequired: number = 1;

      // TODO: add proper miami-coin-address, added wrapped nothing address as a placeholder for now
      const miamiTokenAddress = "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.wrapped-nothing-v8::wrapped-nthng";

      // Fetch the miami coin balance from blockchain API
      fetch(`https://stacks-node-api.${networkName}.stacks.co/extended/v1/address/${stxAddress}/balances`)
      .then(response => {

        response.json()
        .then(jsonResponse => {
          
          // Check miami coin balance from blockchain api
          const miamiBalance: number = jsonResponse.fungible_tokens[miamiTokenAddress] ?
            parseInt(jsonResponse.fungible_tokens[miamiTokenAddress].balance) :
            0;
          
          if (miamiBalance >= numberOfMiamiCoinsRequired){
            // TODO: redirect to user miami vice dashboard
            console.log("You got access!");
          }
          else {
            // TODO: deny access to miami vice or goto register screen
            console.log("Access denied");
          }
        })
      })
    },
    userSession: userSession,
  });
}

export function getUserData() {
  return userSession.loadUserData();
}