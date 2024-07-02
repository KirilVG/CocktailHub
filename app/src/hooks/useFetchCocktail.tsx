import { getCocktailById } from "@/api/cocktailsCalls";
import { AppError, handleError } from "@/lib/errorHandler";
import { ICocktail } from "@@/types";
import { useEffect, useState } from "react";

export function useFetchCocktail(Id: string) {
	const [data, setdata] = useState<ICocktail | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const newData = await getCocktailById(Id);

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