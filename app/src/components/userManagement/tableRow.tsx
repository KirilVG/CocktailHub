import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Trash } from "lucide-react";
import getTranslation from "@/utils/transtationUtil";
import { toast } from "../ui/use-toast";
import SelectRoleCompoment from "./selectRoleComponent";
import { deleteUser, updateUserRole } from "@/api/userCalls";
import { AppError, handleError } from "@/lib/errorHandler";
import type { IUser } from "shared/types";
import { createFilterById as filterById } from "@/utils/filters";

interface TableRowComponentProp {
	userId: string;
	userName: string;
	userEmail: string;
	userRole: string;
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const TableRowComponent: React.FC<TableRowComponentProp> = ({
	userId,
	userName,
	userEmail,
	userRole,
	setUsers
}) => {
	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			getTranslation("userManagement.alertMessage")
		);

		if (confirmDelete) {
			const responseDelete = await deleteUser(userId);

			if (responseDelete instanceof AppError) {
				const errorMessage = handleError(responseDelete);
				toast({ description: errorMessage });
			} else {
				setUsers(users => users.filter(filterById(userId)));
				toast({
					description: getTranslation("userManagement.deleteUserSuccessMessage"),
				});
			}
		}
	};

	const handleUserRoleChange = async (newValue: string) => {
		userRole = newValue;

		const responseUpdate = await updateUserRole(userId, userRole);

		if (responseUpdate instanceof AppError) {
			const errorMessage = handleError(responseUpdate);
			toast({ description: errorMessage });
		} else {
			toast({
				description: getTranslation("userManagement.userChangeSuccessMessage"),
			});
		}
	}

	return (
		<TableRow id="userManagement-card-tableBody-row">
			<TableCell
				className="p-1 lg:p-5 w-fit font-medium text-[0.7rem] lg:text-[1rem]"
				id="userManagement-card-tableBody-row-userName"
				data-testid="userManagement-card-tableBody-row-userName"
			>
				{userName}
			</TableCell>
			<TableCell
				id="userManagement-card-tableBody-row-userEmail"
				className="p-1 lg:p-5 w-fit font-medium text-[0.7rem] lg:text-[1rem]"
			>
				{userEmail}
			</TableCell>
			<TableCell
				className="p-1 lg:p-5 w-fit font-medium text-[0.7rem] lg:text-[1rem]"
				id="userManagement-card-tableBody-row-role"
			>
				<SelectRoleCompoment userRole={userRole} handleUserRoleChange={handleUserRoleChange} />
			</TableCell>
			<TableCell className="p-1 lg:p-5 w-fit font-medium text-[0.7rem] lg:text-[1rem]">
				<Button
					className="bg-white hover:bg-white p-0 cursor-pointer"
					id="userManagement-card-tableBody-row-trashButton"
					onClick={handleDelete}
					data-testid="userManagement-card-tableBody-row-trashButton"
				>
					<Trash className="w-6 h-6 text-[#E27532]" />
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default TableRowComponent;
