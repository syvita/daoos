import { useUserSession } from "./useUserSession";
import { useLoading } from "./useLoading";
import { LOADING_KEYS } from "../store/ui";
import { useUser } from "./useUser";
import { useCallback } from "react";
import { AuthOptions } from "@stacks/connect";
import router, { useRouter } from "next/router";

const APP_NAME = "Miami Voice";
const ICON =
  typeof window !== "undefined" ? window?.location?.origin + "/Mvlogo.svg" : "";
const REDIRECT = "/app";

export function useAuthOptions() {
  const userSession = useUserSession();
  const { setIsLoading } = useLoading(LOADING_KEYS.AUTH);
  const {} = useRouter();
  const { setUser } = useUser();

  const onFinish = useCallback(
    async ({ userSession }) => {
      const userData = userSession?.loadUserData?.();
      await setUser(userData);
      void setIsLoading(false);
      router.replace(REDIRECT);
    },
    [setUser]
  );
  const onCancel = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const authOptions: AuthOptions = {
    sendToSignIn: true,
    userSession,
    onFinish,
    onCancel,
    appDetails: { name: APP_NAME, icon: ICON },
  };
  return authOptions;
}
