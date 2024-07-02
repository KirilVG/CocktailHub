import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import DatePicker from "../ui/datePicker";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Button } from "../ui/button";

export const componentMap = new Map<string, React.ComponentType<any>>([
  [
    "input",
    (props: any) => (
      <Input
        id={props.id}
        data-testid = {props.id}
        placeholder={props.componentProps.placeholder}
        className={props.componentProps.fieldClass}
        {...props.field}
      />
    ),
  ],
  [
    "textarea",
    (props: any) => (
      <Textarea
        id={props.id}
        data-testid = {props.id}
        placeholder={props.componentProps.placeholder}
        className={props.componentProps.fieldClass}
        {...props.field}
      />
    ),
  ],
  [
    "datePicker",
    (props: any) => (
      <DatePicker
        id={props.id}
        field={props.field}
        placeholder={props.componentProps.placeholder}
      />
    ),
  ],
  [
    "button",
    (props: any) => (
      <Button
        id={props.id}
        data-testid = {props.id}
        className={props.componentProps.fieldClass}
        onClick={() => {
          props.componentProps.onClick();
        }}
        type={props.componentProps.type}
      >
        {props.componentProps.placeholder}
      </Button>
    ),
  ],
  [
    "file",
    (props: any) => (
      <>
        <Button
          id={props.id}
          data-testid = {props.id}
          className={props.componentProps.fieldClass}
          onClick={props.componentProps.onClick}
          type={props.componentProps.type}
        >
          {props.componentProps.placeholder}
        </Button>
        <input 
          data-testid = {`${props.id}-input`}
          ref={props.componentProps.fileInputRef}
          type="file"
          accept={props.componentProps.accept}
          onChange={props.componentProps.onChange}
          className="hidden"
        />
      </>
    ),
  ],
  [
    "default",
    (props: any) => (
      <Input
        id={props.id}
        data-testid = {props.id}
        placeholder={props.componentProps.placeholder}
        {...props.field}
        type={props.componentProps.type}
        className="touch-manipulation"
      />
    ),
  ],
]);

class FormControlFactory {
  construct(
    field: ControllerRenderProps<FieldValues, any>,
    componentProps: any,
    id: string
  ) {
    const isValidKey = Array.from(componentMap.keys()).includes(
      componentProps.fieldType
    );
    const ComponentToRender = isValidKey
      ? componentMap.get(componentProps.fieldType)!
      : componentMap.get("default")!;

    return (
      <ComponentToRender
        field={field}
        componentProps={componentProps}
        id={id}
      />
    );
  }
}

export default FormControlFactory;