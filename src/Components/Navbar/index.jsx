// Css and Icons
import "./navbar.css";
import { AiFillSchedule as Logo } from "react-icons/ai";

// Components
import { NavLink } from "react-router-dom";

export default function Index({ children }) {
	const links = [
		{ path: "/calls", text: "Calls" },
		{ path: "/meetings", text: "Meetings" },
	];

	return (
		<>
			<nav className="navbar">
				<div className="wrapper">
					<p className="logo">
						<Logo className="logo-icon" />
						Scheduler
					</p>
					<ul className="navlinks">
						{links.map((link) => {
							return (
								<li key={link.path}>
									<NavLink className="navbar-navlink" to={link.path}>
										{link.text}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
			<div className="app-main">{children}</div>
		</>
	);
}
