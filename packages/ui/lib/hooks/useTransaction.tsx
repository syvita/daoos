import { openContractCall } from "@stacks/connect";
import { useCallback } from "react";
import { CONTRACTS } from "../store/transactions";
import { LOADING_KEYS, mainnetNetworkAtom } from "../store/ui";
import { useLoading } from "./useLoading";
import { useNetwork } from "./useNetwork";
import { useTransactionOptions } from "./useTransactionsOptions";

export function useTransaction(
  functionArgs: any,
  onfinish?: (any) => void,
  isMainnet: boolean = false
) {
  const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.TRNX);
  const { network } = useNetwork(isMainnet);
  const transactionOptions = useTransactionOptions({
    functionArgs,
    functionName: CONTRACTS.votingFunctionName,
    contractAddress: CONTRACTS.votingAddress,
    contractName: CONTRACTS.votingContractName,
    network,
    onFinish: (data) => {
      setIsLoading(false);
      onfinish && onfinish(data);
    },
  });
  const signTransaction = useCallback(() => {
    setIsLoading(true);
    void openContractCall(transactionOptions);
  }, [openContractCall]);
  return { signTransaction };
}
