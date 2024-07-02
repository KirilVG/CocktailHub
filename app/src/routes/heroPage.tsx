import WelcomePage from "@/components/welcomePage";
import { Outlet } from "react-router-dom";

const HeroPage = () => {
	return (
		<div className="sm:container relative flex-col lg:justify-center items-center md:grid lg:grid-cols-2 lg:px-0 sm:p-0 lg:max-w-none md:h-[100vh]">
			<WelcomePage/>
			<div className="flex justify-center p-8 ">
				<Outlet />
			</div>
		</div>
	);
}

export default HeroPage;