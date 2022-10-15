function defaultTime(currentDate, hrs) {
	const date = new Date(currentDate);
	date.setHours(9);
	date.setFullYear(new Date().getFullYear());
	date.setTime(date.getTime() + hrs * 60 * 60 * 1000);
	return date;
}

function formatAMPM(date) {
	const passed = new Date() > date ? true : false;
	let hours = date.getHours();
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	let strTime = `${hours}:00 ${ampm}`;
	let timeObj = { hrs: strTime, passed };
	return timeObj;
}

function getTime(currentDate, extend) {
	return formatAMPM(defaultTime(currentDate, extend));
}

export default getTime;
