import { atomFamily } from "jotai/utils";
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

export enum SLIDE_PANEL_KEYS {
  PROPOSAL = "panel/PROPOSAL",
  PROFILE = "panel/PROFILE",
}

export const loadingAtom = atomFamily((key) => atom(false));

export const selectedProposalAtom=atom({})

export const exampleAtom=atomFamily(key=>atom({}))

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
