import { useAtomValue } from "jotai/utils";
import { userSessionAtom } from "../store/auth";

export function useUserSession() {
    return useAtomValue(userSessionAtom)
}
