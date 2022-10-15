import "./App.css";

// Components
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Pages
import Calls from "./Pages/Calls";

// Store
import { callScheduleActions } from "./Store";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		let storeData = JSON.parse(localStorage.getItem("schedules"));
		if (!storeData || storeData.length === 0) return;
		dispatch(callScheduleActions.refill(storeData));
		console.log("Initial Store Data : ", storeData);
	}, [dispatch]);

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar>
					<Routes>
						<Route path="/*" element={<Navigate to={"/calls"} />} />
						<Route path="/calls/*" element={<Calls />} />
						<Route path="/meetings" />
					</Routes>
				</Navbar>
			</BrowserRouter>
		</div>
	);
}

export default App;
