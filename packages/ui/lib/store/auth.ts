import { atom } from "jotai";
import { AppConfig, UserSession } from "@stacks/auth";
import { atomFamily, atomWithDefault } from "jotai/utils";
import { TProfile } from "../../types";
export const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSessionAtom = atom(() => new UserSession({ appConfig }));
export const userAtom = atomWithDefault((get) => {
  const userSession = get(userSessionAtom);
  if (userSession.isUserSignedIn()) {
    return userSession.loadUserData();
  }
});

const getDefaultProfile = (address) => ({
  name: address,
  isActive: false,
  objectID:address
});

const profileAtomFamily = atomFamily<string, TProfile, TProfile>((key) => {
  try {
    const profile = JSON.parse(localStorage.getItem(key));
    return atom(profile || getDefaultProfile(key));
  } catch (err) {
  }
});

export const profileAtom = atom<TProfile, TProfile>(
  (get) => {
    const user = get(userAtom);
    const address = user?.profile?.stxAddress?.testnet;
    return get(profileAtomFamily(address));
  },
  (get, set, val) => {
     localStorage.setItem(val.objectID, JSON.stringify(val));
    set(profileAtomFamily(val.objectID), val);
  }
);
