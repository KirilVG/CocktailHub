import { IIngredient } from "@@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import dafaultImg from "../../assets/defaultIngredient.jpg";
import getTranslation from "@/utils/transtationUtil";
import { Button } from "../ui/button";
import { useIsAuthorizedToManage } from "@/hooks/useIsAuthorized";

interface IIngredientItemCardProps {
	ingredient: IIngredient;
    handleDelete: (id: string) => void;
    handleEdit: (ingredient: IIngredient) => void;
}

export function IngredientItemCard(props: IIngredientItemCardProps) {
    const isAuthorizedToManage = useIsAuthorizedToManage();
    
    return(<div>
        <Card id="item-card" className="flex flex-col md:flex-row bg-white w-full text-white">
            <img
				alt="Cocktail-Image"
				className="h-[18rem] object-cover rounded-xl"
				src={props.ingredient.imageUri || dafaultImg}
				loading="lazy"
			/>
			<div className="flex flex-col flex-grow text-black">
                <CardHeader id="events-card-header" className="flex flex-col pb-[1rem]">
                    <div className="flex flex-row justify-between">
                        <CardTitle id="events-card-headerTitle" className="text-black flex-grow whitespace-normal break-words max-w-full pr-[1rem] flex items-center">
                            <p>{props.ingredient.name}</p>
                        </CardTitle>
                        {isAuthorizedToManage && 
                            <div className="flex flex-row space-x-2">
                                <Button
                                    className="bg-[#C9942A] hover:bg-[#C9942A] w-30 h-10 cursor-pointer"
                                    id="Edit-Button"
                                    data-testid="Edit-Button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.handleEdit(props.ingredient);
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
                                        props.handleDelete(props.ingredient._id || "");
                                    }}
                                >
                                    {getTranslation("cocktailsPage.buttons.buttonDeleteCocktail")}
                                </Button>
                            </div>
                        }
                    </div>
                </CardHeader>
                <CardContent
			        id="events-card-content"
			        className="text-gray-500 text-sm dark:text-gray-400"
		        >
			        <p>
				        {props.ingredient.description}
                    </p>
		        </CardContent>
			</div>
		</Card>
    </div>)
}