import { getAllBars } from "@/api/barCalls";
import { AppError, handleError } from "@/lib/errorHandler";
import { IBar } from "@@/types";
import { useEffect, useState } from "react";

const useBarsFetcher = () => {
	const [items, setItems] = useState<IBar[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [loadingItems, setLoadingItems] = useState<boolean>(true);

	useEffect(() => {
		const fetchItems = async () => {
			setLoadingItems(true);
			const cocktailsData = await getAllBars();
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

export default useBarsFetcher;