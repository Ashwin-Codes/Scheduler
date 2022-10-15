import "./App.css";

// Components
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Calls from "./Pages/Calls";

function App() {
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
