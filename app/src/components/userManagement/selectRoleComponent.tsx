import getTranslation from "@/utils/transtationUtil";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface SelectRoleCompomentProps {
    userRole: string;
    handleUserRoleChange: any
}

const SelectRoleCompoment: React.FC<SelectRoleCompomentProps> = ({userRole, handleUserRoleChange}) => {
    return (
        <Select
        onValueChange={(newValue) => {
            handleUserRoleChange(newValue);
        }}
				>
					<SelectTrigger className="border-[#E27532] p-0 lg:p-5">
						<SelectValue placeholder={ getTranslation(`userManagement.${userRole}`)}/>
					</SelectTrigger>
					<SelectContent className="lg:py-1 p-0 text-[0.7rem]">
						<SelectItem
							value="user"
							className="text-[0.7rem]"
						>
							{getTranslation("userManagement.user")}
						</SelectItem>
						<SelectItem value="moderator" className="text-[0.7rem]">
							{getTranslation("userManagement.moderator")}
						</SelectItem>
					</SelectContent>
				</Select>
    )
}

export default SelectRoleCompoment;