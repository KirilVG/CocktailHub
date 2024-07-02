import { getUserById } from "@/api/userCalls";
import { AppError, handleError } from "@/lib/errorHandler";
import { IUser } from "@@/types";
import { useEffect, useState } from "react";

export function useFetchUser(Id: string) {
	const [data, setdata] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const newData = await getUserById(Id);

			if (newData instanceof AppError) {
				const errorMessage = handleError(newData);
                setIsLoading(false);
				alert(errorMessage);
			} else {
				setdata(newData);
                setIsLoading(false);
			}
		};

		if (Id != "") fetchData();
	}, [Id]);

	return { data, setdata, isLoading };
};