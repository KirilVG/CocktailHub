import React from "react";
import Navigation from "./navigation/navigation";

const withNavigation = (WrappedComponent: React.ComponentType<any>) => {
	const ComponentWithNavigation = (props: any) => {
		return (
			<div className="flex flex-col-reverse md:flex-row h-screen w-screen">
				<Navigation />
				<div className="bg-slate-200 overflow-y-auto h-full w-full scrollbar">
					<WrappedComponent {...props} />
				</div>
			</div>
		);
	};

	return ComponentWithNavigation;
};

export default withNavigation;
