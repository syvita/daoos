import { atomFamily } from "jotai/utils";
import { env } from "process";

export const CONTRACTS = {
  votingContractAddress: process.env.NEXT_PUBLIC_VOTE_CONTRACT_ADDRESS,
  votingContractName: process.env.NEXT_PUBLIC_VOTE_CONTRACT_NAME,
  votingFunctionName: process.env.NEXT_PUBLIC_VOTE_FUNCTION_NAME,
};
