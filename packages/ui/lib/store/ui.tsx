import { atomFamily, waitForAll } from "jotai/utils";
import { atom } from "jotai";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
import { get } from "react-hook-form";
import { profileAtom } from "./auth";
import { TProfile, TProposal, TVoteSingle } from "../../types";
import { getVotes } from "../mock-utils";
import { date } from "yup/lib/locale";
import { dateGreaterThanNow } from "../utils";

export enum LOADING_KEYS {
  AUTH = "loading/AUTH",
  FORM = "loading/FORM",
  TRNX = "loading/TRNX",
}
export enum TOAST_KEYS {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

type slideOutSettings = {
  title?: string;
  component?: null;
  show?: boolean;
};

export type TMiaStxBalance = {
   balance: number ;
};

export type TStxUsdPrice = {
  blockstack: {
    usd: number;
  };
};

export enum SLIDE_PANEL_KEYS {
  PROPOSAL = "panel/PROPOSAL",
  PROFILE = "panel/PROFILE",
}

const MiamiSTXAddress = "SM2MARAVW6BEJCD13YV2RHGYHQWT7TDDNMNRB1MVT";

const CORE_STX_API_ADDRESS =
  "https://stacks-node-api.mainnet.stacks.co/extended/v1";

const COIN_GECKO_TOKEN_PRICE_END_POINT =
  "https://api.coingecko.com/api/v3/simple/price";

const STX_CG_ID = "blockstack";

const SEARCH_CURRENCY = "usd";

export const loadingAtom = atomFamily((key) => atom(false));

export const selectedProposalAtom = atom({});

export const exampleAtom = atomFamily((key) => atom({}));

export const selectedMemberAtom = atom({});

const toastAtom = atom({});

export const toastAtomOptions = atom(
  (get) => get(toastAtom),
  (get, set, val) => {
    set(toastAtom, {
      ...get(toastAtom),
      ...{ id: val, duration: 5, title: val, type: val as string },
    });
  }
);
const slideOutAtom = atom({ title: "", component: null, show: false });

export const slideOutPanelAtom = atom(
  (get) => get(slideOutAtom),
  (get, set, val) => {
    set(slideOutAtom, {
      ...get(slideOutAtom),
      ...(val as slideOutSettings),
    });
  }
);

export const networkAtom = atom(() => {
  const _network = new StacksTestnet();
  return _network;
});
// Used temporarily to force getting names from mainnet
export const mainnetNetworkAtom = atom(() => {
  const _network = new StacksMainnet();
  return _network;
});

export const isActiveAtom = atom(false);

export const canPerformVoteAtom = atom((get) => {
  const proposal = get(selectedProposalAtom) as TProposal<TVoteSingle>;
  const currentProfile = get(profileAtom) as TProfile;
  const result =
    proposal?.votes?.filter(
      (vote) => vote.voter.objectID == currentProfile.objectID
    ).length == 0 && !dateGreaterThanNow(proposal.expiryDate);
  return result;
});

export const canPerformPostAtom = atom((get) => {
  const profile = get(profileAtom) as TProfile;
  return profile.isActive;
});

export const miaStxWalletValueAtom = atom(async (get) => {
  const response = await fetch(
    `${CORE_STX_API_ADDRESS}/address/${MiamiSTXAddress}/stx`
  );
  const result = (await response.json()) as TMiaStxBalance;
  //console.log(result)
  return result.balance;
});

export const miaUsdValueAtom = atom(async (get) => {
  const urlSearchParams = new URLSearchParams({
    ids: STX_CG_ID,
    vs_currencies: SEARCH_CURRENCY,
  });
  const url = new URL(COIN_GECKO_TOKEN_PRICE_END_POINT);
  url.search = urlSearchParams.toString();
  const response = await fetch(url.toString());
  const result = (await response.json()) as TStxUsdPrice;
  //console.log(result)
  return result.blockstack.usd;
});

export const MiaCoinCurrentValueAtom = atom((get) => {
  const result=  get(waitForAll({
    usd: miaUsdValueAtom,
    stx: miaStxWalletValueAtom,
  }));
  //console.log(result)
  return result
});
