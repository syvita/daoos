import { useAtomValue } from "jotai/utils";
import React from "react";
import { useLoading } from "../../lib/hooks/useLoading";
import { profileAtom } from "../../lib/store/auth";
import { LOADING_KEYS, selectedProposalAtom } from "../../lib/store/ui";
import { postData, prepareVote } from "../../lib/utils";
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
  const proposal = useAtomValue(selectedProposalAtom) as TProposal<TVoteSingle>;
  const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.FORM);
  const onSubmit = async (payload) => {
    try {
      setIsLoading(true);
      const data = prepareVote({
        payload,
        proposal,
        voter: profile.data,
        onChainLink: "https://emptyChainlink.link",
      });
      const updateProposal = await postData(data, "/api/proposals/update");
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
