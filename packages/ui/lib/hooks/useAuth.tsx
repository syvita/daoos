import { showConnect } from "@stacks/connect";
import { useCallback } from "react";
import { useAuthOptions } from "./useAuthOptions";

export function useAuth() {
  const authOptions = useAuthOptions();
  const authenticate = useCallback(() => {
    void showConnect(authOptions);
  }, [showConnect]);
  return { authenticate };
}
