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
import { classNames } from "../lib/utils";

export const TextField: React.FC<{
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
      defaultValue=""
      render={({ field }) => (
        <input
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
      {children} || {capitalize(name)}
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
    <p className={className}>
      {children} || {errors[name].message}
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
      defaultValue=""
      render={({ field }) => (
        <input
          className={classNames(
            errors && errors[name] && errorClass ? errorClass : className
          )}
          type="date"
          {...field}
        />
      )}
    />
  );
};

export const Form: React.FC<{
  onSubmit: (payload) => void;
  formMethods: UseFormReturn;
}> = ({ children, onSubmit, formMethods }) => {
  const methods = formMethods || useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>;
    </FormProvider>
  );
};

export const RichTextField: React.FC<{ name: string }> = ({
  name,
  ...rest
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => <MvRichTextEditor {...field} {...rest} />}
    />
  );
};
