import { getIngredientById } from "@/api/ingredientsCalls";
import { AppError } from "@/lib/errorHandler";
import { handleError } from "@/utils/apiCalls";
import { IIngredient } from "@@/types";
import { useEffect, useState } from "react";

export function useFetchIngredient(Id: string) {
	const [data, setdata] = useState<IIngredient | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const newData = await getIngredientById(Id);

			if (newData instanceof AppError) {
				const errorMessage = handleError(newData);
                setIsLoading(false);
				alert(errorMessage);
			} else {
				setdata(newData);
                setIsLoading(false);
			}
		};

		fetchData();
	}, [Id]);

	return { data, setdata, isLoading };
};