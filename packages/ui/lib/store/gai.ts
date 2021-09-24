import { atom } from "jotai";
import { userSessionAtom } from "./auth";
import { Storage } from "@stacks/storage";
import { atomWithDefault } from "jotai/utils";

export const gaiStorageAtom = atom(
  (get) => new Storage({ userSession: get(userSessionAtom) })
);

export const gaiAtom = atomWithDefault((get) => {
  const userSession = get(userSessionAtom);
  if (userSession.isUserSignedIn()) {
    return gaiStorageAtom;
  }
});
