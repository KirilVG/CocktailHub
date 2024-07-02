import React from "react";
import { Button } from "@/components/ui/button";
import getTranslation from "@/utils/transtationUtil";
import { DialogClose } from "../ui/dialog";
interface FormActionsProps {
  isEdit: boolean;
  isLoading: boolean;
  isPastEvent: boolean;
  handleDelete?: (value: string) => void;
  eventId?: string;
}
const cssClasses = "w-full md:w-40 bg-[#C9942A] col-start-1 col-span-5 md:col-span-1 md:mt-2";

const FormActions: React.FC<FormActionsProps> = ({ isEdit, isLoading, isPastEvent, handleDelete, eventId }) => {
  const deleteButton = (
    id: string,
    labelKey: string,
    btnClass: string,
    type: "button" | "submit" | "reset" | undefined
  ) => (
    <Button 
      id={id}
      data-testid = {id}
      className={btnClass}
      type={type}
      onClick={() => handleDelete!(eventId!)}
    >
      {getTranslation(labelKey)}
    </Button>
  );

  const cancelActionButton = (id: string, labelKey: string, btnClass: string) => (
    <DialogClose asChild>
      <Button 
        id={id}
        data-testid = {id}
        className={btnClass}
        type={"button"}
      >
        {getTranslation(labelKey)}
      </Button>
    </DialogClose>
  );

  const saveActionButton = (id: string, labelKey: string, btnClass: string) => (
    <Button 
      id={id}
      data-testid = {id}
      className={btnClass}
      disabled={isLoading}
      type={"submit"}
    >
      {getTranslation(labelKey)}
    </Button>
  );

  return (
    <>
      {!isEdit ? (
        <>
          {saveActionButton(
            "event-form-submitButton",
            "modalForm.createButton",
            `${cssClasses} md:col-start-2`
          )}

          {cancelActionButton(
            "event-form-cancelButton",
            "modalForm.cancelButton",
            `${cssClasses} md:col-start-4`
          )}
        </>
      ) : (
        <>
          {!isPastEvent &&
            saveActionButton(
              "event-form-saveButton",
              "modalForm.saveButton",
              `${cssClasses} md:col-start-1`
            )}

          {cancelActionButton(
            "event-form-cancelButton",
            "modalForm.cancelButton",
            `${cssClasses} md:col-start-3`
          )}

          {deleteButton(
            "event-form-deleteButton",
            "modalForm.deleteButton",
            `${cssClasses} md:col-start-5`,
            "button"
          )}
        </>
      )}
    </>
  );
};

export default FormActions;