import { createBar, deleteBarById, updateBar } from "@/api/barCalls";
import useBarsFetcher from "@/hooks/useBarsFetcher";
import { AppError } from "@/lib/errorHandler";
import getTranslation from "@/utils/transtationUtil";
import { IBar } from "@@/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { BarItemCard } from "./barComponents/barItemCard";
import { CreateEditBarDialog } from "./barComponents/createEditBarDialog";

export function BarsList() {
    const { items, setItems, loadingItems } = useBarsFetcher();
    const [ isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [ itemForEdit, setItemForEdit] = useState<IBar | null>(null);
    const [ filterValue, setFilterValue] = useState<string>("");

    async function handleDelete(id: string) {
        const result = await deleteBarById(id);

        if (result instanceof AppError) {
			    alert(getTranslation("barsPage.messages.deletionFail"))
        } else {
            let newList = items.filter(item => item._id != id);

            setItems(newList);
        }

    }

    function openCreation() {
        setIsDialogOpen(true);
        setItemForEdit(null);
    }

    async function handleCreate(item: IBar) {
        const result = await createBar(item);

        if (result instanceof AppError) {
			    alert(getTranslation("barsPage.messages.failToCreate"))
        } else {
            const newList = items;
            newList.unshift(result);

            setItems(newList);
            setIsDialogOpen(false);
        }
    }

    async function handleEdit(changedItem: IBar) {
        const result = await updateBar(changedItem);

        if (result instanceof AppError) {
			    alert(getTranslation("barsPage.messages.failToUpdate"))
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

    function openEdit(item: IBar) {
        setIsDialogOpen(true);
        setItemForEdit(item);
    }

    function closeDialog() {
        setIsDialogOpen(false);
    }

    const filteredData = items.filter(item => item.name.toLowerCase().includes(filterValue.toLocaleLowerCase()))

    return (
        <>
          <div className="flex flex-col md:pl-10 md:pr-10 w-full">
            <header className="flex justify-between items-center p-5">
              <h1 className="font-bold text-4xl">
                {getTranslation("barsPage.title")}
              </h1>
              <Button
                    className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                    id="Edit-Button"
                    data-testid="Edit-Button"
                    onClick={() => openCreation()}
                >
                    {getTranslation("barsPage.buttons.buttonCreate")}
                </Button>
            </header>
            <div className="px-5 flex gap-3">
              <span>
                {getTranslation("barsPage.filter")}
              </span>
              <input type="text" className="border-[#C9942A] border-2 rounded" value={filterValue} onChange={(e) => {setFilterValue(e.target.value)}}></input>
            </div>
            {isDialogOpen && <CreateEditBarDialog itemForEdit={itemForEdit} closeDialog={closeDialog} handleEdit={handleEdit} handleCreate={handleCreate}/>}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 p-4">
              {loadingItems ? (
                <div className="flex justify-center items-center w-full">
                  <Spinner size="large" />
                </div>
              ) : (
                <>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData?.map((data, index) => (
                      <div key={data._id || index} data-testid="ingredient-card">
                        <BarItemCard bar={data} handleDelete={handleDelete} handleEdit={openEdit}/>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center">
                      {getTranslation("barsPage.messages.noItemsMessage")}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
    )
}