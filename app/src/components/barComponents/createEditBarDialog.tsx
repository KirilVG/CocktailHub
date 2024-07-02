import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { IBar } from "@@/types";
import { CocktailSelect } from "../cocktailComponents/cocktailSelect";
import { MultiValue } from "react-select";
import { ISelectOption } from "../ingredientComponents/ingredientSelect";
import getTranslation from "@/utils/transtationUtil";

interface ICreateEditBarDialogProps {
    itemForEdit: IBar | null;
    closeDialog: () => void;
    handleCreate: (item: IBar) => void;
    handleEdit: (item: IBar) => void;
}

type IBarFormInputs = {
    name: string;
    description: string;
    workingHours: string
}

export function CreateEditBarDialog(props: ICreateEditBarDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IBarFormInputs>()
    const [file, setFile] = useState<string | ArrayBuffer | null>();
    const [cocktails, setCocktails] = useState<string[]>(props.itemForEdit?.cocktails || []);

    const onSubmit: SubmitHandler<IBarFormInputs> = (data) => {
        if(!props.itemForEdit) {
            const newItem: IBar = {
                name: data.name,
                dateCreated: new Date(),
                description: data.description,
                workingHours: data.workingHours,
                cocktails: cocktails,
                imageUri: file?.toString() || ""
            };

            data.name = "";
            data.description = "";
            data.workingHours = "";
            setFile("");

            props.handleCreate(newItem);
        } else {
            const newItem: IBar = {
                _id:  props.itemForEdit._id,
                ownerID: props.itemForEdit.ownerID,
                name: data.name,
                cocktails: cocktails,
                workingHours: data.workingHours,
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
            alert(getTranslation("barsPage.messages.failToSetFile"));
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

    function handleCocktailsChange (selected: MultiValue<ISelectOption>) {
        const newCocktails = selected.map(cocktail => cocktail.value);
        setCocktails(newCocktails);
    }

    return (
        <Dialog open={true} onOpenChange={props.closeDialog}>
				<DialogContent className="border-[#C9942A] border-2 max-w-[50em] max-h-[55em] md:max-h-[45em] overflow-y-auto rounded-xl">
					<DialogHeader className="mb-8 sm:text-center">
						<DialogTitle data-testid={"event-form-title"}>
							{props.itemForEdit
								? getTranslation("barsPage.edit")
								: getTranslation("barsPage.create")
                            }
						</DialogTitle>
					</DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("barsPage.form.name")}</label>
                            {errors.name && <span>{getTranslation("barsPage.form.fieldIsRequired")}</span>}
                            <input className="border-[#C9942A] border-2 rounded" defaultValue={props.itemForEdit?.name || ""} {...register("name",{ required: true })} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("barsPage.form.describtion")}</label>
                            <textarea className="border-[#C9942A] border-2 rounded min-h-32" defaultValue={props.itemForEdit?.description || ""} {...register("description")} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("barsPage.form.openHours")}</label>
                            <input className="border-[#C9942A] border-2 rounded" defaultValue={props.itemForEdit?.workingHours || ""} {...register("workingHours")} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("barsPage.form.image")}</label>
                            <input type="file" accept=".jpg,.png" onChange={handleFileChange}/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("barsPage.form.menu")}</label>
                            <CocktailSelect handleChange={handleCocktailsChange} dafaultValue={props.itemForEdit?.cocktails || []}/>
                        </div>
                        <Button
                            type="submit"
                            className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                            id="Edit-Button"
                            data-testid="Edit-Button"
                        >
                            {getTranslation("barsPage.form.submit")}
                        </Button>
                    </form>
				</DialogContent>
			</Dialog>
    );
}