export const isPastDate = (startingDate: Date) => {
	const today = new Date().setHours(0, 0, 0, 0);

	return startingDate.setHours(0, 0, 0, 0) <  today;
};