// Css
import "./weekRange.css";

// Components
import { Link } from "react-router-dom";

// Helpers
import getDay from "../../../../Helpers/getDay";

// Hooks
import { useParams } from "react-router-dom";

export default function Index() {
	const params = useParams();

	const days = [];
	for (let i = 0; i <= 6; i++) {
		days.push(getDay(i));
	}

	// active url
	function isActiveLink(day) {
		if (params["*"] === day) {
			return "week-range-day active";
		} else {
			return "week-range-day";
		}
	}

	return (
		<div className="week-range">
			{days.map((day) => {
				return (
					<Link className={isActiveLink(day)} key={day} to={day}>
						{day}
					</Link>
				);
			})}
		</div>
	);
}
