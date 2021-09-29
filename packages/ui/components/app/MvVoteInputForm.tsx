import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import React from "react";
import { useLoading } from "../../lib/hooks/useLoading";
import { useVoteTransaction } from "../../lib/hooks/useVoteTransaction";
import { profileAtom } from "../../lib/store/auth";
import { LOADING_KEYS, selectedProposalAtom } from "../../lib/store/ui";
import {
  getBallot,
  postData,
  prepareVote,
  prepareVoteArgs,
} from "../../lib/utils";
import { TProposal, TRadioGroupSettings, TVoteSingle } from "../../types";
import { Form, RadioGroup, SubmitButton } from "./MvFormControls";

const settings: TRadioGroupSettings[] = [
  {
    name: "Yes",
    description:
      "Selecting this options signifies that you support this proposal",
  },
  {
    name: "No",
    description:
      "Selecting this options signifies that you do not support this proposal",
  },
];

const MvVoteInputForm = () => {
  const profile = useAtomValue(profileAtom);
  const [proposal, setProposal] = useAtom(selectedProposalAtom);
  const {signVoteTransaction} = useVoteTransaction();
  const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.FORM);
  const onSubmit = async (payload) => {
    try {
      const data = prepareVote({
        payload,
        proposal,
        voter: profile,
        onChainLink: "https://emptyChainlink.link",
      });
      setIsLoading(true);
      //console.log(data);
      /*const chainArgs = prepareVoteArgs({
        ballot: getBallot(payload),
        email: profile.email,
        name: profile.name,
        proposalId: proposal.objectID,
        userId: profile.objectID,
      });
      
      console.log(chainArgs);
      const result = await signVoteTransaction(chainArgs as any);
      console.log(result);
      */
      const result = await postData(data, "/api/proposals/update");
      setProposal({...proposal,...result})
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <RadioGroup name="vote" title="Vote For Proposal" settings={settings} />
      <SubmitButton loading={isLoading} />
    </Form>
  );
};

export default MvVoteInputForm;
