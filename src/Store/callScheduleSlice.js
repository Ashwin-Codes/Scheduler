import { createSlice } from "@reduxjs/toolkit";

const callScheduleSlice = createSlice({
	name: "Call",
	initialState: [],
	reducers: {
		addCallSchedule(state, action) {
			console.log(action.payload);
			state.push(action.payload);
		},
	},
});

export default callScheduleSlice;
