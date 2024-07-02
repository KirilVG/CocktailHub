import { useFetchCocktail } from "@/hooks/useFetchCocktail";
import { Card, CardHeader, CardTitle } from "../ui/card";
import dafaultImg from "../../assets/defaultCocktail.jpg";
import { useNavigate } from "react-router-dom";
import { COCKTAILS_PAGE } from "@/constants/routesConsts";

interface ICocktailMinorCardProps {
    id: string
}

export function CocktailMinorCard(props: ICocktailMinorCardProps) {
    const { data } = useFetchCocktail(props.id);
    const navigate = useNavigate();

    return (
        <Card id="cocktail-card" className="flex flex-col bg-white h-full text-white" onClick={() => { navigate(`${COCKTAILS_PAGE}/${data?._id}`) }}>
            <img
				alt="Cocktail-Image"
				className="w-full h-[18rem] object-cover rounded-xl"
				src={data?.imageUri || dafaultImg}
				loading="lazy"
			/>
                <CardHeader id="events-card-header" className="flex flex-col pb-[1rem]">
                        <CardTitle id="events-card-headerTitle" className="text-black flex-grow whitespace-normal break-words max-w-full pr-[1rem] flex items-center">
                            <p>{data?.name}</p>
                        </CardTitle>
                </CardHeader>
        </Card>
    );
}