import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";

const BigSidebar = () => {
	const { showSidebar, toggleSidebar } = useDashboardContext();
	return (
		<Wrapper>
			<div className={!showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
				<div className="content">
					<header>
						<Logo />
					</header>
					<NavLinks isBigSidebar />
				</div>
			</div>
		</Wrapper>
	);
};

export default BigSidebar;
