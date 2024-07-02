import { useFetchIngredient } from "@/hooks/useFetchIngredient";

interface IIngredientMinorCardProps {
    id: string
}

export function IngredientMinorCard(props: IIngredientMinorCardProps) {
    const { data } = useFetchIngredient(props.id);
    return (
        <li>{data?.name}</li>
    );
}