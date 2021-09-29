import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { prepareProposal, proposalYupSchema as schema } from "../../lib/utils";

import { toast } from "react-nextjs-toast";

import {
  RichTextField,
  TextField,
  Label,
  Form,
  Error,
  DateField,
  SubmitButton,
} from "./MvFormControls";
import { postData } from "../../lib/utils";
import { TFormInputs } from "../../types";

import { useLoading } from "../../lib/hooks/useLoading";
import {
  canPerformPostAtom,
  LOADING_KEYS,
  toastAtomOptions,
  TOAST_KEYS,
} from "../../lib/store/ui";
import { useAtom } from "jotai";
import { useUser } from "../../lib/hooks/useUser";
import { useAtomValue } from "jotai/utils";
import { useSlideOut } from "../../lib/hooks/useSlideOut";
import MvButton from "../common/MvButton";
import MvProfileInputForm from "./MvProfileInputForm";
import { useRouter } from "next/router";

const POST_URL = "/api/proposals/create";

const MvProposalInputForm = () => {
  const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.FORM);
  const [toastOptions, setToastOptions] = useAtom(toastAtomOptions);
  const canPost = useAtomValue(canPerformPostAtom);
  const router =useRouter()
  const { setPanel } = useSlideOut();
  const { profile } = useUser();
  const onSubmit = async (payload: TFormInputs) => {
    setIsLoading(true);
    try {
      await postData(prepareProposal(payload, profile, 250), POST_URL);
      setToastOptions(TOAST_KEYS.SUCCESS);
      toast.notify("successfully added your proposal!", toastOptions);
      router.push('/app')
    } catch (err) {
      setToastOptions(TOAST_KEYS.SUCCESS);
      toast.notify(err.message, toastOptions);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Form onSubmit={onSubmit} resolver={yupResolver(schema)}>
      <div className="bg-white overflow-hidden shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <Label className="form-control-label" name="title" />
              <div className="mt-1">
                <TextField
                  errorClass="form-control-error"
                  name="title"
                  className="form-control"
                />
                <Error name="title" />
              </div>
            </div>

            <div className="sm:col-span-3 ">
              <Label className="form-control-label" name="startDate" />
              <div className="mt-1">
                <DateField
                  errorClass="form-control-error"
                  name="startDate"
                  className="form-control"
                />
                <Error name="startDate" />
              </div>
            </div>
            <div className="sm:col-span-3 ">
              <Label className="form-control-label" name="endDate" />
              <div className="mt-1">
                <DateField
                  errorClass="form-control-error"
                  name="endDate"
                  className="form-control"
                />
                <Error name="endDate" />
              </div>
            </div>

            <div className="sm:col-span-6">
              <Label className="form-control-label" name="content" />
              <div className="mt-1">
                <RichTextField name="content" />
                <Error name="content" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mt-6 mx-auto border-t sm:px-6 lg:px-0">
        {canPost &&
          <SubmitButton loading={isLoading} />}
       </div>
    </Form>
          {!canPost && <MvButton
            title="Submit"
            onClick={() => {
              setPanel({ component: MvProfileInputForm, show: true });
            }}
          />}
    </>
  );
};

export default MvProposalInputForm;
