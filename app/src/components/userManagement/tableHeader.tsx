import { capitalizeFirstLetter } from "@/utils/textUtils";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import getTranslation from "@/utils/transtationUtil";

const TableHeaderComponent = () => {
	return (
		<TableHeader id="userManagement-card-header">
			<TableRow className="text-center text-[0.7rem] lg:p-5 lg:text-[1rem]">
				<TableHead id="userManagement-card-header-user" className="p-1">
					{capitalizeFirstLetter(getTranslation("form.username"))}
				</TableHead>
				<TableHead id="userManagement-card-email" className="p-1">
					{capitalizeFirstLetter(getTranslation("form.email"))}
				</TableHead>
				<TableHead id="userManagement-card-role" className="p-1">
					{getTranslation("userManagement.role")}
				</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default TableHeaderComponent;
