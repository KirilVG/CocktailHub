import { getAllCocktails } from "@/api/cocktailsCalls";
import { AppError, handleError } from "@/lib/errorHandler";
import { ICocktail } from "@@/types";
import { useEffect, useState } from "react";

const useCocktailsFetcher = () => {
	const [cocktails, setCocktails] = useState<ICocktail[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [loadingCocktails, setLoadingCocktails] = useState<boolean>(true);

	useEffect(() => {
		const fetchCocktails = async () => {
			setLoadingCocktails(true);
			const cocktailsData = await getAllCocktails();
			if (cocktailsData instanceof AppError) {
				const errorMessage = handleError(cocktailsData);
				setErrorMessage(errorMessage);
			} else {
				setCocktails(cocktailsData);
			}

			setLoadingCocktails(false);
		};

        fetchCocktails()
	}, []);

	return { cocktails, setCocktails, loadingCocktails, errorMessage };
};

export default useCocktailsFetcher;