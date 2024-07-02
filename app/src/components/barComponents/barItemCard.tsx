import { IBar } from "@@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import dafaultImg from "../../assets/defaultBar.jpg";
import { Button } from "../ui/button";
import getTranslation from "@/utils/transtationUtil";
import { useNavigate } from "react-router-dom";
import { BARS_ROUTE } from "@/constants/routesConsts";
import { useIsAuthorizedToEditBar } from "@/hooks/useIsAuthorized";

interface IBarItemCardProps {
	bar: IBar;
    handleDelete: (id: string) => void;
    handleEdit: (bar: IBar) => void;
}

export function BarItemCard(props: IBarItemCardProps) {
    const navigate = useNavigate();
    const isAuthorisedToManage = useIsAuthorizedToEditBar(props.bar.ownerID);

    return(<div>
        <Card className="flex flex-col bg-white h-full text-white" onClick={() => { navigate(`${BARS_ROUTE}/${props.bar._id}`) }}>
            <img
				alt="Cocktail-Image"
				className="w-full h-[18rem] object-cover rounded-xl"
				src={props.bar.imageUri || dafaultImg}
				loading="lazy"
			/>
			<div className="flex flex-col flex-grow text-black">
                <CardHeader id="events-card-header" className="flex flex-col pb-[1rem]">
                    <div className="flex flex-row justify-between min-h-12">
                        <CardTitle id="events-card-headerTitle" className="text-black flex-grow whitespace-normal break-words max-w-full pr-[1rem] flex items-center">
                            <p>{props.bar.name}</p>
                        </CardTitle>
                        {isAuthorisedToManage && <div className="flex flex-row space-x-2">
                            <Button
                                className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                id="Edit-Button"
                                data-testid="Edit-Button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.handleEdit(props.bar);
                                }}
                            >
                                {getTranslation("barsPage.buttons.buttonEdit")}
                            </Button>
                            <Button
                                className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                id="Edit-Button"
                                data-testid="Edit-Button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.handleDelete(props.bar._id || "");
                                }}
                            >
                                {getTranslation("barsPage.buttons.buttonDelete")}
                            </Button>
                        </div>}
                    </div>
                </CardHeader>
                <CardContent
			        id="events-card-content"
			        className="text-gray-500 text-sm dark:text-gray-400 min-h-16"
		        >
			        <CardDescription className="max-w-[32rem] text-ellipsis whitespace-nowrap overflow-hidden cut-text">
				        {props.bar.description}
			        </CardDescription>
                    {props.bar.workingHours && <span>{getTranslation("barsPage.openHours")}{props.bar.workingHours}</span>}
		        </CardContent>
			</div>
		</Card>
    </div>)
}