import { createSlice } from "@reduxjs/toolkit";

const callScheduleSlice = createSlice({
	name: "Call",
	initialState: [],
	reducers: {
		addCallSchedule(state, action) {
			console.log("in slice: ", action.payload);
			state.push(action.payload);
		},
		removeSchedule(state, action) {
			const filteredState = state.filter((sch) => {
				return !(sch.id === action.payload);
			});
			return filteredState;
		},
		refill(state, action) {
			console.log("in refill slice: ", action.payload);
			return action.payload;
		},
	},
});

export default callScheduleSlice;
