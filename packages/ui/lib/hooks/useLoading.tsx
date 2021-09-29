import { useAtom } from "jotai";
import { loadingAtom } from "../store/ui";

export function useLoading(key: string) {
  const [isLoading, setIsLoading] = useAtom(loadingAtom(key));

  return { isLoading, setIsLoading };
}
