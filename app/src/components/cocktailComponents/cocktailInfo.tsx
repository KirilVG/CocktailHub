
import { useFetchCocktail } from "@/hooks/useFetchCocktail";
import { Spinner } from "../ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import dafaultImg from "../../assets/defaultCocktail.jpg";
import getTranslation from "@/utils/transtationUtil";
import { useFetchUser } from "@/hooks/useFetchUser";
import { IngredientMinorCard } from "../ingredientComponents/ingredientMinorCard";
import { Button } from "../ui/button";
import { useState } from "react";
import { deleteCocktailById, updateCocktail } from "@/api/cocktailsCalls";
import { AppError } from "@/lib/errorHandler";
import { useNavigate } from "react-router-dom";
import { COCKTAILS_PAGE } from "@/constants/routesConsts";
import { ICocktail } from "@@/types";
import { CreateEditDialog } from "./createEditDialog";
import { useIsAuthorizedToEditCocktail } from "@/hooks/useIsAuthorized";

interface ICocktailInfo {
    id: string,
}

export function CoctailInfo(props: ICocktailInfo) {

    const { data, setdata, isLoading } = useFetchCocktail(props.id);
    const { data: userdata } = useFetchUser(data?.creatorId || "");
    const [ isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const isAuthorisedToManage = useIsAuthorizedToEditCocktail(data?.creatorId);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spinner size="large" />
            </div>
        )
    }

    function getIngredients() {
        return data?.ingredients.map(ingredient => <IngredientMinorCard key={ingredient} id={ingredient} />);
    }

    async function handleDelete() {
        const result = await deleteCocktailById(data?._id || "");

        if (result instanceof AppError) {
			alert(getTranslation("cocktailsPage.messages.deletionFail"))
        } else {
            navigate(COCKTAILS_PAGE);
        }

    }

    async function handleCreate(item: ICocktail) {
    }

    async function handleEdit(changedItem: ICocktail) {
        const result = await updateCocktail(changedItem);

        if (result instanceof AppError) {
			alert("failed to update");
        } else {
            setdata(changedItem);
            closeDialog();
        }
    }

    function openEdit() {
        setIsDialogOpen(true);
    }

    function closeDialog() {
        setIsDialogOpen(false);
    }

    return (
        <div id="Coctail-tDetails" className="md:gap-6 xl:gap-10 md:grid lg:mx-[4rem]">
            {isDialogOpen && <CreateEditDialog cocktailForEdit={data} closeDialog={closeDialog} handleEdit={handleEdit} handleCreate={handleCreate}/>}
            <div className="flex flex-col md:pl-7 md:pt-[1rem]">
                <div className="flex lg:flex-row flex-col mb-[1rem]">
                    <Card
			            id="event-eventDetailsComponent"
			            data-testid="event-details"
			            className="flex-[0.5] col-span-2 bg-white dark:bg-gray-800 shadow-lg lg:mr-[1rem] mb-[1rem] lg:mb-0 rounded-lg md:w-full"
		            >
			            <div
                            id="event-eventDetailsComponent-card"
                            className="flex flex-row justify-between items-center px-3 border-b-2"
                        >
                            <CardHeader className="flex flex-col">
                                <CardTitle className="text-black">{data?.name}</CardTitle>
                                {data?.creatorId && 
                                    <div className="text-gray-500 text-xs dark:text-gray-400">
                                        <span>{getTranslation("cocktailsPage.belongsTo")}</span>
                                        <span>{userdata?.username || getTranslation("cocktailsPage.unknownUser")}</span>
                                    </div>
                                }
                            </CardHeader>
                            {isAuthorisedToManage && <div className="flex flex-row space-x-2">
                                <Button
                                    className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                    id="Edit-Button"
                                    data-testid="Edit-Button"
                                    onClick={(e) => {
                                        openEdit();
                                    }}
                                >
                                    {getTranslation("cocktailsPage.buttons.buttonEditCocktail")}
                                </Button>
                                <Button
                                    className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                    id="Edit-Button"
                                    data-testid="Edit-Button"
                                    onClick={(e) => {
                                        handleDelete();
                                    }}
                                >
                                    {getTranslation("cocktailsPage.buttons.buttonDeleteCocktail")}
                                </Button>
                            </div>}
                        </div>
                        { data && data.ingredients.length > 0 && <CardContent>
                            <CardTitle className="my-[1rem]">{getTranslation("cocktailsPage.ingredients")}</CardTitle>
                            <ol>
                                {getIngredients()}
                            </ol>
                        </CardContent>}
		            </Card>
                    <img
                        alt="Event"
                        className="lg:flex-[0.5] dark:bg-gray-800 shadow-lg rounded-lg max-h-[28rem] overflow-auto object-cover"
                        src={data?.imageUri || dafaultImg}
                        loading="lazy"
                    />
                </div>
                {data?.description && (
                    <Card id="event-eventDescriptionComponent" data-testid="event-eventDescriptionComponent" className="shadow-lg mb-[1rem]">
                        <CardHeader className="font-bold border-b-2">
                            <h2 className="text-lg text-[#E27532]">
                                {getTranslation("cocktailsPage.description")}
                            </h2>
                        </CardHeader>
                        <CardContent className="p-4 overflow-hidden overflow-y-auto scrollbar w-full max-h-[39rem] pb-[1rem]">
                            {data?.description}
                        </CardContent>
                    </Card>
                )}
                <Card id="event-eventDescriptionComponent" data-testid="event-eventDescriptionComponent" className="shadow-lg mb-[1rem]">
                    <CardHeader className="font-bold border-b-2">
                        <h2 className="text-lg text-[#E27532]">
                            {getTranslation("cocktailsPage.preparationInstructions")}
                        </h2>
                    </CardHeader>
                    <CardContent className="p-4 overflow-hidden overflow-y-auto scrollbar w-full max-h-[39rem] pb-[1rem]">
                        {data?.preparationInstructions}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}