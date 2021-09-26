import React from "react";
import {
  Label,
  RichTextField,
  SubmitButton,
  Error,
  Form,
  TextField,
} from "./MvFormControls";

import { toast } from "react-nextjs-toast";

import {
  membershipYupSchema as schema,
  postData,
  prepareProfile,
} from "../../lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoading } from "../../lib/hooks/useLoading";
import {
  canPerformPostAtom,
  LOADING_KEYS,
  toastAtomOptions,
  TOAST_KEYS,
} from "../../lib/store/ui";
import { TProfile, TProfileFormInputs } from "../../types";
import { useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { profileAtom } from "../../lib/store/auth";
import MvWarningAlert from "../common/MvWarningAlert";

const MvProfileInputForm = () => {
  const [toastOptions, setToastOptions] = useAtom(toastAtomOptions);
  const { isLoading, setIsLoading } = useLoading(LOADING_KEYS.FORM);
  const [profile, setProfile] = useAtom(profileAtom);
  const canPost = useAtomValue(canPerformPostAtom);

  const onSubmit = async (payload: TProfileFormInputs) => {
    console.log(payload);

    try {
      setIsLoading(true);
      const updatedProfile = await postData(
        prepareProfile(payload),
        "/api/members/update"
      );

      setProfile(updatedProfile);
      setToastOptions(TOAST_KEYS.SUCCESS);

      toast.notify("successfully updated your profile!", toastOptions);
    } catch (err) {
      setToastOptions(TOAST_KEYS.ERROR);
      console.log(toastOptions);
      toast.notify(err.message, toastOptions);

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!canPost && (
        <MvWarningAlert
          body="Your profile must be properly edited before you can make a post"
          title="Attention"
        />
      )}
      <Form
        defaultValues={profile.data}
        onSubmit={onSubmit}
        resolver={yupResolver(schema)}
      >
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="font-bold text-gray-700 ">Edit Profile</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <Label className="form-control-label" name="name" />
                <div className="mt-1">
                  <TextField
                    errorClass="form-control-error"
                    name="name"
                    className="form-control"
                  />
                  <Error name="name" />
                </div>
              </div>

              <div className="sm:col-span-6">
                <Label className="form-control-label" name="email" />
                <div className="mt-1">
                  <TextField
                    type="email"
                    errorClass="form-control-error"
                    name="email"
                    className="form-control"
                  />
                  <Error name="email" />
                </div>
              </div>

              <div className="sm:col-span-6">
                <Label className="form-control-label" name="bio" />
                <div className="mt-1">
                  <RichTextField name="bio" />
                  <Error name="bio" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mt-6 mx-auto border-t sm:px-6 lg:px-0">
          <SubmitButton loading={isLoading} />
        </div>
      </Form>
    </>
  );
};

export default MvProfileInputForm;
