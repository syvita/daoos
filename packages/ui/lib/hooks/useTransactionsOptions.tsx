import { ContractCallOptions, TransactionOptions } from "@stacks/connect";

const APP_NAME = "Miami Voice";
const ICON =
  typeof window !== "undefined"
    ? window && window?.location?.origin + "/Mvlogo.svg"
    : "";

export function useTransactionOptions({
  /*onFinish,*/
  contractAddress,
  contractName,
  functionName,
  network,
}: {
  contractAddress: string;
  /*onFinish: (payload: any) => void;*/
  contractName: string;
  functionName: string;
  network: any;
}) {
  const setChainArgs: (functionArgs: any) => ContractCallOptions = (
    functionArgs
  ) => ({
    /*onFinish,*/
    contractAddress,
    contractName,
    functionArgs,
    functionName,
    network,
    appDetails: { name: APP_NAME, icon: ICON },
  });
  return { setChainArgs };
}
