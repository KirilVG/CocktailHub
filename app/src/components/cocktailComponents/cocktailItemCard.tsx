import { ICocktail } from "@@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import dafaultImg from "../../assets/defaultCocktail.jpg";
import { Button } from "../ui/button";
import getTranslation from "@/utils/transtationUtil";
import { useNavigate } from "react-router-dom";
import { COCKTAILS_PAGE } from "@/constants/routesConsts";
import { useIsAuthorizedToEditCocktail } from "@/hooks/useIsAuthorized";

interface ICocktailItemCardProps {
	cocktail: ICocktail;
    handleDelete: (id: string) => void;
    handleEdit: (cocktail: ICocktail) => void;
}

export function CocktailItemCard(props: ICocktailItemCardProps) {
    const navigate = useNavigate();
    const isAuthorisedToManage = useIsAuthorizedToEditCocktail(props.cocktail.creatorId);
    
    return(<div>
        <Card id="cocktail-card" className="flex flex-col bg-white h-full text-white" onClick={() => { navigate(`${COCKTAILS_PAGE}/${props.cocktail._id}`) }}>
            <img
				alt="Cocktail-Image"
				className="w-full h-[18rem] object-cover rounded-xl"
				src={props.cocktail.imageUri || dafaultImg}
				loading="lazy"
			/>
			<div className="flex flex-col flex-grow text-black">
                <CardHeader id="events-card-header" className="flex flex-col pb-[1rem]">
                    <div className="flex flex-row justify-between min-h-12">
                        <CardTitle id="events-card-headerTitle" className="text-black flex-grow whitespace-normal break-words max-w-full pr-[1rem] flex items-center">
                            <p>{props.cocktail.name}</p>
                        </CardTitle>
                        {isAuthorisedToManage && <div className="flex flex-row space-x-2 ">
                            <Button
                                className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                id="Edit-Button"
                                data-testid="Edit-Button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.handleEdit(props.cocktail);
                                }}
                            >
                                {getTranslation("cocktailsPage.buttons.buttonEditCocktail")}
                            </Button>
                            <Button
                                className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                id="Edit-Button"
                                data-testid="Edit-Button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.handleDelete(props.cocktail._id || "");
                                }}
                            >
                                {getTranslation("cocktailsPage.buttons.buttonDeleteCocktail")}
                            </Button>
                        </div>}
                    </div>
                </CardHeader>
                <CardContent
			        id="events-card-content"
			        className="text-gray-500 text-sm dark:text-gray-400"
		        >
			        <CardDescription className="max-w-[32rem] text-ellipsis whitespace-nowrap overflow-hidden cut-text">
				        {props.cocktail.description}
			        </CardDescription>
		        </CardContent>
			</div>
		</Card>
    </div>)
}