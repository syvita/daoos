import React from "react";
import { useForm } from "react-hook-form";
import { RichTextField, TextField, Label } from "./MvFormControls";

const MvProposalInputForm = () => {
  return (
    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <Label name="title" />
            <div className="mt-1">
              <TextField name="title" className="form-control" />
            </div>
          </div>
          <div className="sm:col-span-6">
            <Label name="content" />
            <div className="mt-1">
              <RichTextField name="content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MvProposalInputForm;
