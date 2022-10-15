// Css
import "./calls.css";

// Components
import WeekRange from "./Subcomponents/weekRange";
import Schedule from "./Subcomponents/schedule";

// Hooks
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Helpers
import getDay from "../../Helpers/getDay";

export default function Index() {
	// Navigate User to sublink
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === "/calls") {
			navigate(getDay(0)); // Navigate to current date
			return;
		}
	}, [location, navigate]);

	return (
		<div className="page-wrapper calls-page-wrapper">
			<WeekRange />
			<Schedule />
		</div>
	);
}
