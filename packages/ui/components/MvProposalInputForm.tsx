import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  RichTextField,
  TextField,
  Label,
  Form,
  Error,
  DateField,
} from "./MvFormControls";

const schema = yup.object().shape({
  title: yup.string().required(),
  startDate: yup.date().required('Please select a start date'),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date should be later than start date")
    .required("end date is required")
});

const MvProposalInputForm = () => {
  const onSubmit = (payload) => {
    //TODO plugin api for submitting data to backend
    console.log(payload);
  };

  return (
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
                <Error name="startDate"/>
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
        <button
          type="submit"
          className="sm:w-1/6  mt-6 text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default MvProposalInputForm;
