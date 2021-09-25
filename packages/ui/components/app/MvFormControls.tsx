import React from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import MvRichTextEditor from "./MvRichTextEditor";
import capitalize from "lodash.capitalize";
import { classNames } from "../../lib/utils";
import MvLoader from "./MvLoader";
import MvRadioGroupComponent from "./MvRadioGroupComponent";
import moment from "moment";

const TYPES = { Text: "text", Date: "date" };

export const TextField: React.FC<{
  name: string;
  className?: string;
  type?: string;
  errorClass?: string;
}> = ({ name, className, errorClass, type }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <input
          type={type || TYPES.Text}
          {...field}
          className={classNames(
            errors && errors[name] && errorClass ? errorClass : className
          )}
        />
      )}
    />
  );
};

export const Label: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
  children,
}) => {
  return (
    <label htmlFor={name} className={className}>
      {children || capitalize(name)}
    </label>
  );
};

export const Error: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
  children,
}) => {
  const {
    formState: { errors },
  } = useFormContext();
  return errors && errors[name] ? (
    <p className={className || "form-control-error-text"}>
      {children || errors[name].message}
    </p>
  ) : (
    <></>
  );
};

export const DateField: React.FC<{
  name: string;
  className?: string;
  errorClass?: string;
}> = ({ name, className, errorClass }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={moment(new Date()).format()}
      render={({ field }) => (
        <input
          required
          className={classNames(
            errors && errors[name] && errorClass ? errorClass : className
          )}
          type={TYPES.Date}
          {...field}
        />
      )}
    />
  );
};

export const Form: React.FC<{
  onSubmit?: (payload: any) => void;
  formMethods?: UseFormReturn;
  resolver?: any;
  defaultValues?: any;
}> = ({ children, onSubmit, formMethods, resolver, defaultValues }) => {
  const methods = useForm({ resolver, defaultValues });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export const SubmitButton: React.FC<{ loading?: boolean }> = ({ loading }) => {
  return (
    <button disabled={loading} type="submit" className=" form-control-btn">
      {loading && (
        <div className="mr-2">
          <MvLoader />
        </div>
      )}{" "}
      Submit
    </button>
  );
};

export const RichTextField: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onBlur, onChange, value } }) => (
        <MvRichTextEditor
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          className={className}
        />
      )}
    />
  );
};

export const RadioGroup: React.FC<{
  name: string;
  className?: string;
  title: string;
  settings: { name: string; description?: string; id?: any }[];
}> = ({ name, className, title, settings }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <MvRadioGroupComponent settings={settings} title={title} {...field} />
      )}
    />
  );
};
