import { ContractCallOptions, openContractCall, TransactionOptions } from "@stacks/connect";
import { useCallback } from "react";
import { TChainVoteArgs } from "../../types";
import { CONTRACTS } from "../store/transactions";
import { LOADING_KEYS, mainnetNetworkAtom } from "../store/ui";
import { useLoading } from "./useLoading";
import { useNetwork } from "./useNetwork";
import { useTransactionOptions } from "./useTransactionsOptions";
import { useConnect } from "@stacks/connect-react";

export function useVoteTransaction(
  onfinish?: (any) => void,
  isMainnet: boolean = false
) {
  const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.TRNX);
  const { network } = useNetwork(false);
  const { setChainArgs } = useTransactionOptions({
    functionName: CONTRACTS.votingFunctionName,
    contractAddress: CONTRACTS.votingContractAddress,
    contractName: CONTRACTS.votingContractName,
    network,
    /*onFinish: (data) => {
      setIsLoading(false);
      onfinish && onfinish(data);
    },*/
  });
  const signVoteTransaction = (args:any) =>openContractCall(setChainArgs(args))
    /*useCallback(() => {
      setIsLoading(true);
      void openContractCall(setChainArgs(args) as any);
    }, [openContractCall]);*/
  return {signVoteTransaction}
}
