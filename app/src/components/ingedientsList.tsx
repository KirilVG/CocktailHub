import { createIngredient, deleteIngredientById, updateIngredient } from "@/api/ingredientsCalls";
import useIngredientsFetcher from "@/hooks/useIngredientsFetcher";
import { AppError } from "@/lib/errorHandler";
import getTranslation from "@/utils/transtationUtil";
import { IIngredient } from "@@/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { IngredientItemCard } from "./ingredientComponents/ingredientItemCard";
import { CreateEditIngredientdDialog } from "./ingredientComponents/createEditIngredientdDialog";
import { useIsAuthorizedToManage } from "@/hooks/useIsAuthorized";

export function IngredientsList() {
    const { items, setItems, loadingItems } = useIngredientsFetcher();
    const [ isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [ itemForEdit, setItemForEdit] = useState<IIngredient | null>(null);
    const isAuthorizedToManage = useIsAuthorizedToManage();
    const [ filterValue, setFilterValue] = useState<string>("");

    async function handleDelete(id: string) {
        const result = await deleteIngredientById(id);

        if (result instanceof AppError) {
			    alert(getTranslation("ingredientsPage.messages.failToDelete"))
        } else {
            let newList = items.filter(item => item._id != id);

            setItems(newList);
        }

    }

    function openCreation() {
        setIsDialogOpen(true);
        setItemForEdit(null);
    }

    async function handleCreate(item: IIngredient) {
        const result = await createIngredient(item);

        if (result instanceof AppError) {
			    alert(getTranslation("ingredientsPage.messages.failToCreate"))
        } else {
            const newList = items;
            newList.unshift(result);

            setItems(newList);
            setIsDialogOpen(false);
        }
    }

    async function handleEdit(changedItem: IIngredient) {
        const result = await updateIngredient(changedItem);

        if (result instanceof AppError) {
			    alert(getTranslation("ingredientsPage.messages.failToUpdate"))
        } else {
            const newList = items;
            const indexToUpdate = newList.findIndex(
                (item) => item._id === changedItem._id
            );
    
            if (indexToUpdate !== -1) {
                newList[indexToUpdate] = changedItem;
            }

            setItems(newList);
            setIsDialogOpen(false);
        }
    }

    function openEdit(item: IIngredient) {
        setIsDialogOpen(true);
        setItemForEdit(item);
    }

    function closeDialog() {
        setIsDialogOpen(false);
    }

    const filteredData = items.filter(item => item.name.toLowerCase().includes(filterValue.toLocaleLowerCase()))

    return (
        <>
          <div className="flex flex-col md:pl-10 md:pr-10 w-full gap-3">
            <header className="flex justify-between items-center p-5">
              <h1 id="cocktails-title" className="font-bold text-4xl">
                {getTranslation("ingredientsPage.title")}
              </h1>
              {isAuthorizedToManage && 
                <Button
                  className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                  id="Edit-Button"
                  data-testid="Edit-Button"
                  onClick={() => openCreation()}
                >
                  {getTranslation("ingredientsPage.buttons.buttonCreate")}
                </Button>
              }
            </header>
            <div className="px-5 flex gap-3">
              <span>
              {getTranslation("ingredientsPage.filter")}
              </span>
              <input type="text" className="border-[#C9942A] border-2 rounded" value={filterValue} onChange={(e) => {setFilterValue(e.target.value)}}></input>
            </div>
            {isDialogOpen && <CreateEditIngredientdDialog itemForEdit={itemForEdit} closeDialog={closeDialog} handleEdit={handleEdit} handleCreate={handleCreate}/>}
            <div className="flex flex-col gap-6">
              {loadingItems ? (
                <div className="flex justify-center items-center w-full">
                  <Spinner size="large" />
                </div>
              ) : (
                <>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData?.map((data, index) => (
                      <div key={data._id || index} data-testid="ingredient-card">
                        <IngredientItemCard ingredient={data} handleDelete={handleDelete} handleEdit={openEdit}/>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center">
                      {getTranslation("ingredientsPage.messages.noItemsMessage")}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
    )
}