import getTranslation from "@/utils/transtationUtil";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { ICocktail } from "@@/types";
import { ISelectOption, IngredientSelect } from "../ingredientComponents/ingredientSelect";
import { MultiValue } from "react-select";

interface ICreateEditDialogProps {
    cocktailForEdit: ICocktail | null;
    closeDialog: () => void;
    handleCreate: (cocktail: ICocktail) => void;
    handleEdit: (cocktail: ICocktail) => void;
}

type ICocktailFOrmInputs = {
    name: string;
    description: string;
    preparationInstructions: string;
}

export function CreateEditDialog(props: ICreateEditDialogProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICocktailFOrmInputs>()
    const [file, setFile] = useState<string | ArrayBuffer | null>();
    const [ingredients, setIngredients] = useState<string[]>(props.cocktailForEdit?.ingredients || []);

    const onSubmit: SubmitHandler<ICocktailFOrmInputs> = (data) => {
        if(!props.cocktailForEdit) {
            const newCocktail: ICocktail = {
                name: data.name,
                dateCreated: new Date(),
                ingredients: ingredients,
                preparationInstructions: data.preparationInstructions,
                description: data.description,
                imageUri: file?.toString() || ""
            };

            data.name = "";
            data.description = "";
            data.preparationInstructions = "";
            setFile("");

            props.handleCreate(newCocktail);
        } else {
            const newCocktail: ICocktail = {
                _id:  props.cocktailForEdit._id,
                creatorId: props.cocktailForEdit.creatorId,
                name: data.name,
                dateCreated: props.cocktailForEdit.dateCreated,
                ingredients: ingredients,
                preparationInstructions: data.preparationInstructions,
                description: data.description,
                imageUri: file?.toString() || props.cocktailForEdit.imageUri
            };
            props.handleEdit(newCocktail)
        }
    }

    function handleIngredientsChange (selected: MultiValue<ISelectOption>) {
        const newIngredients = selected.map(ingr => ingr.value);
        setIngredients(newIngredients);
        console.log(ingredients);
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) {
            alert(getTranslation("cocktailsPage.messages.failToSetFile"));
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
							{props.cocktailForEdit
								? getTranslation("cocktailsPage.editCocktail")
								: getTranslation("cocktailsPage.createCocktail")}
						</DialogTitle>
					</DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("cocktailsPage.form.name")}</label>
                            {errors.name && <span>{getTranslation("cocktailsPage.form.fieldIsRequired")}</span>}
                            <input className="border-[#C9942A] border-2 rounded" defaultValue={props.cocktailForEdit?.name || ""} {...register("name",{ required: true })} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("cocktailsPage.form.describtion")}</label>
                            <textarea className="border-[#C9942A] border-2 rounded min-h-32" defaultValue={props.cocktailForEdit?.description || ""} {...register("description")} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("cocktailsPage.form.ingredients")}</label>
                            <IngredientSelect handleChange={handleIngredientsChange} dafaultValue={props.cocktailForEdit?.ingredients || []}/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("cocktailsPage.form.image")}</label>
                            <input type="file" accept=".jpg,.png" onChange={handleFileChange}/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#9b9a9b]">{getTranslation("cocktailsPage.form.preparationSteps")}</label>
                            {errors.preparationInstructions && <span>{getTranslation("cocktailsPage.form.fieldIsRequired")}</span>}
                            <textarea className="border-[#C9942A] border-2 rounded min-h-32" defaultValue={props.cocktailForEdit?.preparationInstructions || ""} {...register("preparationInstructions",{ required: true })} />
                        </div>
                        <Button
                            type="submit"
                            className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                            id="Edit-Button"
                            data-testid="Edit-Button"
                        >
                            {getTranslation("cocktailsPage.form.submit")}
                        </Button>
                    </form>
				</DialogContent>
			</Dialog>
    );
}