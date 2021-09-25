import { atom } from "jotai";
import { AppConfig, UserSession } from "@stacks/auth";
import { atomWithDefault } from "jotai/utils";
import { gaiStorageAtom } from "./gai";

export const appConfig = new AppConfig(["store_write", "publish_data"]);

const PROFILE_FILE_NAME = "my_daoo_mv_apps_profile.json";

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

const defaultProfile = atomWithDefault((get) => {
  const profile = get(fetchProfileAtom);
  if (!profile.data) {
    const name =
      get(userAtom)?.username || get(userAtom)?.profile?.stxAddress?.mainnet;
    const imageUrl = "/avatar-place-holder.jpg";
    return { data: { name, imageUrl, id: name }, loading: false, error: null };
  }
});

const fetchProfileAtom = atom({ data: null, loading: true, error: null });

export const profileAtom = atom(
  (get) => {
    return get(fetchProfileAtom);
  },
  (get, set, data) => {
    const store = get(gaiStorageAtom);

    const fetchProfile = async () => {
      set(fetchProfileAtom, (prev) => ({ ...prev, loading: true }));
      try {
        let result: any;
        if (data) {
          await store.putFile(PROFILE_FILE_NAME, JSON.stringify(data));
          result = data;
        } else {
          result = await store.getFile(PROFILE_FILE_NAME);
        }

        set(fetchProfileAtom, {
          loading: false,
          error: null,
          data:JSON.parse(result),
        });
      } catch (error) {
        if (error.code === ERR_FILE_NOT_EXIST) {
          await store.putFile(
            PROFILE_FILE_NAME,
            JSON.stringify(get(defaultProfile))
          );
        }
        set(fetchProfileAtom, { loading: false, error, data: null });
      }
    };
    fetchProfile();
  }
);

profileAtom.onMount = (runProfile) => {
  runProfile();
};
