import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { TableBody, Table } from "@/components/ui/table";
import TableHeaderComponent from "./tableHeader";
import TableRowComponent from "./tableRow";
import getTranslation from "@/utils/transtationUtil";
import useUsersFetcher from "@/hooks/useUserFetcher";

const UserManagement = () => {
	const { users, setUsers } = useUsersFetcher();

	return (
		<Card
			id="userManagement-card"
			className="lg:mx-[8rem] lg:mb-[1rem] w-fit lg:w-auto"
		>
			<CardHeader>
				<CardTitle
					id="userManagement-card-title"
					className="font-bold text-[#E27532] text-3xl"
				>
					{getTranslation("navigation.userManagement")}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-2 lg:p-6">
				<Table>
					<TableHeaderComponent />
					<TableBody id="userManagement-card-tableBody">
						{users.map((userData, index) => (
							<TableRowComponent
								key={userData._id || index}
								userId={userData._id || ""}
								userEmail={userData.email}
								userName={userData.username}
								userRole={userData.role}
								setUsers={setUsers}
							/>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default UserManagement;
