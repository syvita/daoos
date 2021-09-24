import { atomFamily } from "jotai/utils";
import { Atom, atom } from "jotai";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { userSessionAtom } from "./auth";
import { AuthOptions } from "@stacks/connect";

export enum LOADING_KEYS {
  AUTH = "loading/AUTH",
  CLAIM_HEY = "loading/CLAIM_HEY",
  SEND_HEY = "loading/SEND_HEY",
}


export const loadingAtom = atomFamily((key) => atom(false));
export const networkAtom = atom(() => {
  const _network = new StacksTestnet();
  //_network.coreApiUrl = "https://stacks-node-api.regtest.stacks.co";
  return _network;
});
// Used temporarily to force getting names from mainnet
export const mainnetNetworkAtom = atom(() => {
  const _network = new StacksMainnet();
  //_network.coreApiUrl = "https://stacks-node-api.stacks.co";
  return _network;
});
