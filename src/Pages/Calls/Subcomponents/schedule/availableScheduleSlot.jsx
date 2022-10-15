export default function AvailableScheduleSlot({ timeObj, className, id }) {
	return (
		<div className={"schedule-info-container"}>
			<h2 className="schedule-info-time">{timeObj.hrs}</h2>
			<div className={`schedule-info-call ${className}`} data-time={timeObj.hrs} data-id={id}>
				{timeObj.passed ? "Not Available" : "Available"}
			</div>
		</div>
	);
}
