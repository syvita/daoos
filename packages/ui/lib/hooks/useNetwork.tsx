import { useAtomValue } from "jotai/utils";
import { mainnetNetworkAtom, networkAtom } from "../store/ui";

export function useNetwork(isMainnet?: boolean) {
  const network = useAtomValue(isMainnet ? mainnetNetworkAtom:networkAtom);
  return { network };
}
