import useCocktailsFetcher from "@/hooks/useCocktailsFetcher";
import getTranslation from "@/utils/transtationUtil";
import { Spinner } from "./ui/spinner";
import { CocktailItemCard } from "./cocktailComponents/cocktailItemCard";
import { createCocktail, deleteCocktailById, updateCocktail } from "@/api/cocktailsCalls";
import { AppError } from "@/lib/errorHandler";
import { Button } from "./ui/button";
import { CreateEditDialog } from "./cocktailComponents/createEditDialog";
import { useState } from "react";
import { ICocktail } from "@@/types";

const CocktailsList: React.FC = () => {
    const { cocktails, setCocktails, loadingCocktails } = useCocktailsFetcher();
    const [ isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [ cocktailForEdit, setCocktailForEdit] = useState<ICocktail | null>(null);
    const [ filterValue, setFilterValue] = useState<string>("");

    async function handleDelete(id: string) {
        const result = await deleteCocktailById(id);

        if (result instanceof AppError) {
			    alert(getTranslation("cocktailsPage.messages.failToDelete"))
        } else {
            let newList = cocktails.filter(cocktail => cocktail._id != id);

            setCocktails(newList);
        }

    }

    function openCreation() {
        setIsDialogOpen(true);
        setCocktailForEdit(null);
    }

    async function handleCreate(cocktail: ICocktail) {
        const result = await createCocktail(cocktail);

        if (result instanceof AppError) {
			    alert(getTranslation("cocktailsPage.messages.failToCreate"))
        } else {
            const newList = cocktails;
            newList.unshift(result);

            setCocktails(newList);
            setIsDialogOpen(false);
        }
    }

    async function handleEdit(changedCocktail: ICocktail) {
        const result = await updateCocktail(changedCocktail);

        if (result instanceof AppError) {
			    alert(getTranslation("cocktailsPage.messages.failToUpdate"))
        } else {
            const newList = cocktails;
            const indexToUpdate = newList.findIndex(
                (cocktail) => cocktail._id === changedCocktail._id
            );
    
            if (indexToUpdate !== -1) {
                newList[indexToUpdate] = changedCocktail;
            }

            setCocktails(newList);
            setIsDialogOpen(false);
        }
    }

    function openEdit(cocktail: ICocktail) {
        setIsDialogOpen(true);
        setCocktailForEdit(cocktail);
    }

    function closeDialog() {
        setIsDialogOpen(false);
    }
    const filteredData = cocktails.filter(cocktail => cocktail.name.toLowerCase().includes(filterValue.toLocaleLowerCase()))

    return (
        <>
          <div className="flex flex-col md:pl-10 w-full">
            <header className="flex justify-between items-center p-5">
              <h1 id="cocktails-title" className="font-bold text-4xl">
                {getTranslation("cocktailsPage.title")}
              </h1>
              <Button
                    className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                    id="Edit-Button"
                    data-testid="Edit-Button"
                    onClick={() => openCreation()}
                >
                    {getTranslation("cocktailsPage.buttons.buttonCreateCocktail")}
                </Button>
            </header>
            <div className="px-5 flex gap-3">
              <span>
                {getTranslation("cocktailsPage.filter")}
              </span>
              <input type="text" className="border-[#C9942A] border-2 rounded" value={filterValue} onChange={(e) => {setFilterValue(e.target.value)}}></input>
            </div>
            {isDialogOpen && <CreateEditDialog cocktailForEdit={cocktailForEdit} closeDialog={closeDialog} handleEdit={handleEdit} handleCreate={handleCreate}/>}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 p-4">
              {loadingCocktails ? (
                <div className="flex justify-center items-center w-full">
                  <Spinner size="large" />
                </div>
              ) : (
                <>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData?.map((cocktailData, index) => (
                      <div key={cocktailData._id || index} data-testid="cocktail-card">
                        <CocktailItemCard cocktail={cocktailData} handleDelete={handleDelete} handleEdit={openEdit}/>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center">
                      {getTranslation("cocktailsPage.messages.noItemsMessage")}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      );
}

export default CocktailsList;