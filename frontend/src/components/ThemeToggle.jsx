import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";
import React from "react";

const ThemeToggle = () => {
	const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
	return (
		<Wrapper onClick={toggleDarkTheme}>
			{isDarkTheme ? <BsFillSunFill className="toggle-icon" /> : <BsFillMoonFill />}
		</Wrapper>
	);
};

export default ThemeToggle;
