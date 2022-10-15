// Css
import "./schedule.css";

// Helpers
import getTime from "../../../../Helpers/getTime";

// Hooks
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Store
import { callScheduleActions } from "../../../../Store";

// Components
import AvailableScheduleSlot from "./availableScheduleSlot";
import ScheduledSlot from "./scheduledSlot";

export default function Index() {
	const dispatch = useDispatch();
	const schedules = useSelector((state) => {
		const schedulesIds = [];
		state.callSchedules.forEach((schedule) => {
			schedulesIds.push(schedule.id);
		});
		return schedulesIds;
	});

	const params = useParams();
	const currentDate = params["*"];

	const nineToEightTime = [];
	for (let i = 0; i <= 15; i++) {
		nineToEightTime.push(getTime(currentDate, i));
	}

	function addScheduleHandler(e) {
		const classList = e.target.classList;
		const selectedTime = e.target.dataset.time;
		const id = e.target.dataset.id;

		if (classList.contains("schedule-info-call") && classList.contains("available")) {
			const a = prompt("Title : ");
			const b = prompt("Number : ");
			const c = prompt("Description : ");

			dispatch(
				callScheduleActions.addCallSchedule({
					id,
					title: a,
					number: b,
					desc: c,
					date: currentDate,
					time: selectedTime,
				})
			);
		}
	}

	return (
		<div className="schedule-container" onClick={addScheduleHandler}>
			{nineToEightTime.map((timeObj) => {
				const className = timeObj.passed ? "passed" : "available";
				const id = currentDate.split(" ").join("") + timeObj.hrs.split(" ").join("");

				if (schedules.includes(id)) {
					return (
						<ScheduledSlot
							timeObj={timeObj}
							className={className}
							id={id}
							key={timeObj.hrs}
						/>
					);
				}

				return (
					<AvailableScheduleSlot
						timeObj={timeObj}
						className={className}
						id={id}
						key={id}
					/>
				);
			})}
		</div>
	);
}
