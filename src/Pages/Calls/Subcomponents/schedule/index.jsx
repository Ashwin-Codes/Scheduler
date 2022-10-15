// Css
import "./schedule.css";

// Helpers
import getTime from "../../../../Helpers/getTime";

// Hooks
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";

// Store
import { callScheduleActions } from "../../../../Store";

// Components
import AvailableScheduleSlot from "./availableScheduleSlot";
import ScheduledSlot from "./scheduledSlot";

export default function Index() {
	const dispatch = useDispatch();

	const [scheduleInfo, setSheduleInfo] = useState(null);
	const [openModal, setOpenModal] = useState(false);

	const schedulesId = useSelector((state) => {
		const schedulesIds = [];
		if (!state.callSchedules) return;
		state.callSchedules.forEach((schedule) => {
			schedulesIds.push(schedule.id);
		});
		return schedulesIds;
	});

	const schedules = useSelector((state) => {
		return state.callSchedules;
	});

	const params = useParams();
	const currentDate = params["*"];

	const nineToEightTime = [];
	for (let i = 0; i <= 15; i++) {
		nineToEightTime.push(getTime(currentDate, i));
	}

	// Modal Input Ref
	const titleRef = useRef();
	const numberRef = useRef();
	const descRef = useRef();

	function addScheduleHandler(e) {
		const classList = e.target.classList;
		const selectedTime = e.target.dataset.time;
		const id = e.target.dataset.id;

		if (classList.contains("schedule-info-call") && classList.contains("available")) {
			setSheduleInfo({ selectedTime, id });
			setOpenModal(true);
		}

		if (classList.contains("schedule-info-call") && classList.contains("scheduled")) {
			setSheduleInfo({ selectedTime, id, editing: true });
			setOpenModal(true);
			const schedule = schedules.find((sch) => {
				return sch.id === id;
			});

			setTimeout(() => {
				titleRef.current.value = schedule.title;
				numberRef.current.value = schedule.number;
				descRef.current.value = schedule.desc;
			}, 100);
		}
	}

	function modalSubmitHandler(e) {
		e.preventDefault();
		let title = titleRef.current.value;
		let number = numberRef.current.value;
		let desc = descRef.current.value;

		if (scheduleInfo.editing) {
			dispatch(callScheduleActions.removeSchedule(scheduleInfo.id));
		}

		dispatch(
			callScheduleActions.addCallSchedule({
				id: scheduleInfo.id,
				title,
				number,
				desc,
				date: currentDate,
				time: scheduleInfo.selectedTime,
			})
		);
		setOpenModal(false);
		setSheduleInfo(null);

		// Saving state
		let newState = [
			...schedules,
			{
				id: scheduleInfo.id,
				title,
				number,
				desc,
				date: currentDate,
				time: scheduleInfo.selectedTime,
			},
		];

		if (scheduleInfo.editing) {
			newState = schedules.filter((schedule) => {
				return !(schedule.id === scheduleInfo.id);
			});
			newState.push({
				id: scheduleInfo.id,
				title,
				number,
				desc,
				date: currentDate,
				time: scheduleInfo.selectedTime,
			});
		}

		localStorage.setItem("schedules", JSON.stringify(newState));
	}

	return (
		<div className="schedule-container" onClick={addScheduleHandler}>
			{openModal && (
				<div className="schedule-prompt">
					<form onSubmit={modalSubmitHandler}>
						<span
							className="modal-close-btn"
							onClick={() => {
								setOpenModal(false);
							}}
						>
							✘
						</span>
						<input type="text" ref={titleRef} placeholder="Title" />
						<input type="text" ref={numberRef} placeholder="Number" />
						<input type="text" ref={descRef} placeholder="Description" />
						<button type="submit">Submit</button>
					</form>
				</div>
			)}
			{nineToEightTime.map((timeObj) => {
				const className = timeObj.passed ? "passed" : "available";
				const id = currentDate.split(" ").join("") + timeObj.hrs.split(" ").join("");

				if (schedulesId.includes(id)) {
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
