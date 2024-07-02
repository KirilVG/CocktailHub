import { useFetchBar } from "@/hooks/useFetchBar";
import { useFetchUser } from "@/hooks/useFetchUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import { deleteBarById, updateBar } from "@/api/barCalls";
import { AppError } from "@/lib/errorHandler";
import getTranslation from "@/utils/transtationUtil";
import { BARS_ROUTE } from "@/constants/routesConsts";
import { IBar } from "@@/types";
import { CreateEditBarDialog } from "./createEditBarDialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import dafaultImg from "../../assets/defaultBar.jpg";
import { CocktailMinorCard } from "../cocktailComponents/cocktailMinorCard";
import { useIsAuthorizedToEditBar } from "@/hooks/useIsAuthorized";

interface IBarInfo {
    id: string,
}

export function BarInfo(props: IBarInfo) {

    const { data, setdata, isLoading } = useFetchBar(props.id);
    const { data: userdata } = useFetchUser(data?.ownerID || "");
    const [ isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const isAuthorisedToManage = useIsAuthorizedToEditBar(data?.ownerID);
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spinner size="large" />
            </div>
        )
    }

    function renderMenu() {
        return data?.cocktails.map(cocktail => <CocktailMinorCard id={cocktail} key={cocktail}/>);
    }

    async function handleDelete() {
        const result = await deleteBarById(data?._id || "");

        if (result instanceof AppError) {
			alert(getTranslation("barsPage.messages.failToDelete"));
        } else {
            navigate(BARS_ROUTE);
        }

    }

    async function handleCreate(item: IBar) {
    }

    async function handleEdit(changedItem: IBar) {
        const result = await updateBar(changedItem);

        if (result instanceof AppError) {
			alert(getTranslation("barsPage.messages.failToUpdate"))
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
        <div className="md:gap-6 xl:gap-10 md:grid lg:mx-[4rem]">
            {isDialogOpen && <CreateEditBarDialog itemForEdit={data} closeDialog={closeDialog} handleEdit={handleEdit} handleCreate={handleCreate}/>}
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
                                {data?.ownerID && 
                                    <div className="text-gray-500 text-xs dark:text-gray-400">
                                        <span>{getTranslation("barsPage.belongsTo")}</span>
                                        <span>{userdata?.username || getTranslation("barsPage.unknownUser")}</span>
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
                                    {getTranslation("barsPage.buttons.buttonEdit")}
                                </Button>
                                <Button
                                    className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                    id="Edit-Button"
                                    data-testid="Edit-Button"
                                    onClick={(e) => {
                                        handleDelete();
                                    }}
                                >
                                    {getTranslation("barsPage.buttons.buttonDelete")}
                                </Button>
                            </div>}
                        </div>
                        { data?.description && 
                            <CardContent>
                                {data?.description}
                            </CardContent>
                        }
		            </Card>
                    <img
                        alt="Event"
                        className="lg:flex-[0.5] dark:bg-gray-800 shadow-lg rounded-lg max-h-[28rem] overflow-auto object-cover"
                        src={data?.imageUri || dafaultImg}
                        loading="lazy"
                    />
                </div>
                { data && (data?.cocktails.length > 0)  && 
                    <Card id="event-eventDescriptionComponent" data-testid="event-eventDescriptionComponent" className="shadow-lg mb-[1rem]">
                        <CardHeader className="font-bold border-b-2">
                            <h2 className="text-lg text-[#E27532]">
                                {getTranslation("barsPage.menu")}
                            </h2>
                        </CardHeader>
                        <CardContent className="p-[1rem]">
                            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 p-4">
                                {renderMenu()}
                            </div>
                        </CardContent>
                    </Card>}
            </div>
        </div>
    );
}