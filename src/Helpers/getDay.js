function getDay(days) {
	var date = new Date();
	date.setDate(date.getDate() + days);
	const month = date.toLocaleString("default", { month: "long" });
	return `${date.getDate()} ${month}`;
}

export default getDay;
