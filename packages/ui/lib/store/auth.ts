import { atom } from "jotai";
import { AppConfig, UserSession } from "@stacks/auth";
import { atomFamily, atomWithDefault, atomWithStorage } from "jotai/utils";
import { gaiStorageAtom } from "./gai";
import { TProfile } from "../../types";
import { profileEnd } from "console";

export const appConfig = new AppConfig(["store_write", "publish_data"]);

const PROFILE_FILE_NAME = "my_daoo_mv_app_profile_0.json";

const getFileOptions = {};

const ERR_FILE_NOT_EXIST = "does_not_exist";

const putFileOptions = {
  dangerouslyIgnoreEtag: true,
  contentType: "application/json",
};

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
    //console.log(profile)
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
