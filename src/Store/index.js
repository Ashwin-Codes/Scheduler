import { configureStore } from "@reduxjs/toolkit";

// Slice
import callScheduleSlice from "./callScheduleSlice";

const Store = configureStore({
	reducer: {
		callSchedules: callScheduleSlice.reducer,
	},
});

// Action Exports
export const callScheduleActions = callScheduleSlice.actions;

// Store Export
export default Store;
