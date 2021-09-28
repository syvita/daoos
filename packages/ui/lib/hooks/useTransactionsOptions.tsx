import { TransactionOptions } from "@stacks/connect";

const APP_NAME = "Miami Voice";
const ICON =
  typeof window !== "undefined" ? window?.location?.origin + "/Mvlogo.svg" : "";

export function useTransactionOptions({
  onFinish,
  contractAddress,
  contractName,
  functionArgs,
  functionName,
  network,
}: {
  contractAddress: string;
  onFinish: (payload: any) => void;
  contractName: string;
  functionName: string;
  functionArgs: any;
  network: any;
}) {
  const TransactionOptions: TransactionOptions = {
    onFinish,
    contractAddress,
    contractName,
    functionArgs,
    functionName,
    network,
    appDetails: { name: APP_NAME, icon: ICON },
  };
  return TransactionOptions;
}
