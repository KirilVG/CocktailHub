import { getAllIngredients } from "@/api/ingredientsCalls";
import { AppError, handleError } from "@/lib/errorHandler";
import { IIngredient } from "@@/types";
import { useEffect, useState } from "react";

const useIngredientsFetcher = () => {
	const [items, setItems] = useState<IIngredient[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [loadingItems, setLoadingItems] = useState<boolean>(true);

	useEffect(() => {
		const fetchItems = async () => {
			setLoadingItems(true);
			const cocktailsData = await getAllIngredients();
			if (cocktailsData instanceof AppError) {
				const errorMessage = handleError(cocktailsData);
				setErrorMessage(errorMessage);
			} else {
				setItems(cocktailsData);
			}

			setLoadingItems(false);
		};

        fetchItems()
	}, []);

	return { items, setItems, loadingItems, errorMessage };
};

export default useIngredientsFetcher;