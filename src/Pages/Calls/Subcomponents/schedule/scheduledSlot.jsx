// Store
import { useSelector } from "react-redux";

export default function ScheduledSlot({ timeObj, className, id }) {
	const schedule = useSelector((state) => {
		return state.callSchedules.filter((schedule) => {
			return schedule.id === id;
		});
	})[0];

	return (
		<div className="schedule-info-container">
			<h2 className="schedule-info-time">{timeObj.hrs}</h2>
			<div className="schedule-info-call scheduled" data-time={timeObj.hrs} data-id={id}>
				<h3 className="schedule-info-call-title">{schedule.title}</h3>
				<h3 className="schedule-info-call-number">{schedule.number}</h3>
				<h3 className="schedule-info-call-description">{schedule.desc}</h3>
			</div>
		</div>
	);
}
