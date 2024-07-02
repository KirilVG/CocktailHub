import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { IIngredient } from "@@/types";
import getTranslation from "@/utils/transtationUtil";

interface ICreateEditDialogProps {
    itemForEdit: IIngredient | null;
    closeDialog: () => void;
    handleCreate: (item: IIngredient) => void;
    handleEdit: (item: IIngredient) => void;
}

type IIngredientFormInputs = {
    name: string;
    description: string;
}

export function CreateEditIngredientdDialog(props: ICreateEditDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IIngredientFormInputs>()
    const [file, setFile] = useState<string | ArrayBuffer | null>();

    const onSubmit: SubmitHandler<IIngredientFormInputs> = (data) => {
        if(!props.itemForEdit) {
            const newItem: IIngredient = {
                name: data.name,
                dateCreated: new Date(),
                description: data.description,
                imageUri: file?.toString() || ""
            };

            data.name = "";
            data.description = "";
            setFile("");

            props.handleCreate(newItem);
        } else {
            const newItem: IIngredient = {
                _id:  props.itemForEdit._id,
                creatorId: props.itemForEdit.creatorId,
                name: data.name,
                dateCreated: props.itemForEdit.dateCreated,
                description: data.description,
                imageUri: file?.toString() || props.itemForEdit.imageUri
            };
            props.handleEdit(newItem)
        }
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) {
            alert(getTranslation("ingredientsPage.messages.failToSetFile"));
            setFile(null);
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setFile(reader.result);
            };
            reader.onerror = function (error) {
                alert(error);
                setFile(null);
            };
        }
    }

    return (
        <Dialog open={true} onOpenChange={props.closeDialog}>
				<DialogContent className="border-[#C9942A] border-2 max-w-[50em] max-h-[55em] md:max-h-[45em] overflow-y-auto rounded-xl">
					<DialogHeader className="mb-8 sm:text-center">
						<DialogTitle data-testid={"event-form-title"}>
							{props.itemForEdit
								? getTranslation("ingredientsPage.edit")
								: getTranslation("ingredientsPage.create")
                            }
						</DialogTitle>
					</DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("ingredientsPage.form.name")}</label>
                            {errors.name && <span>{getTranslation("ingredientsPage.form.fieldIsRequired")}</span>}
                            <input className="border-[#C9942A] border-2 rounded" defaultValue={props.itemForEdit?.name || ""} {...register("name",{ required: true })} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("ingredientsPage.form.describtion")}</label>
                            <textarea className="border-[#C9942A] border-2 rounded min-h-32" defaultValue={props.itemForEdit?.description || ""} {...register("description")} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("ingredientsPage.form.image")}</label>
                            <input type="file" accept=".jpg,.png" onChange={handleFileChange}/>
                        </div>
                        <Button
                            type="submit"
                            className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                            id="Edit-Button"
                            data-testid="Edit-Button"
                        >
                            {getTranslation("ingredientsPage.form.submit")}
                        </Button>
                    </form>
				</DialogContent>
			</Dialog>
    );
}