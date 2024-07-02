import logo from "../assets/Logo-text.svg";
import getTranslation from "@/utils/transtationUtil";

const WelcomePage: React.FC = () => {
	return (
		<div id="heroPage-welcomePage" className="relative md:flex flex-col justify-center bg-muted p-10 dark:border-r h-full text-white">
			<div className="absolute inset-0 bg-[#202738]" />
			<div className="relative flex justify-center items-center">
				<div id="heroPage-welcomePage-logo" className="flex flex-col items-center lg:p-8 w-4/5">
					<img
						alt="Cocktail_hub_logo"
						className="mb-4 rounded-lg w-4/6 md:w-4/12 lg:w-4/6 object-cover"
						src={logo}
					/>
					<div id="heroPage-welcomePage-title" className="md:block flex justify-center w-full">
						<h1 className="border-slate-500 py-3 border-b-2 font-bold text-2xl text-center lg:text-3xl">
							{getTranslation("title")}
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
