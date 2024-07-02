import { getBarById } from "@/api/barCalls";
import { AppError } from "@/lib/errorHandler";
import { handleError } from "@/utils/apiCalls";
import { IBar } from "@@/types";
import { useEffect, useState } from "react";

export function useFetchBar(Id: string) {
	const [data, setdata] = useState<IBar | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const newData = await getBarById(Id);

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