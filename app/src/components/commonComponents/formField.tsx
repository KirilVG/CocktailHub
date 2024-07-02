import React, { RefObject } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FormControlFactory from "./formControlFactory";

export interface FormFiledInterface {
  id: string;
  form: any;
  nameForm: string;
  label?: string;
  fieldType?: string;
  placeholder?: string;
  itemClass?: string;
  errorClass?: string;
  fieldClass?: string;
  onClick?: (num: number) => void;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef?: RefObject<HTMLInputElement>;
  type?: string;
}

const factory = new FormControlFactory();

const FormFieldComponent: React.FC<FormFiledInterface> = (props: any) => {
  const {
    id,
    form,
    nameForm,
    label,
    itemClass,
    errorClass,
    ...componentProps
  } = props;

  return (
    <FormField
      control={form.control}
      name={nameForm}
      render={({ field }) => (
        <FormItem className={itemClass}>
          {label && (
            <FormLabel className="mr-[1em] text-black" htmlFor={id}>{label}</FormLabel>
          )}
          <FormControl>
            {factory.construct(field, componentProps, id)}
          </FormControl>
          <FormMessage id={`${id}-Error`} className={errorClass} />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
