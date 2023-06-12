/**
 * Generate range of dates in e year
 *
 * @param year year of dates
 * @param range how many days of range
 */
export function generateDateRanges(year: number, range = 90): [string, string][] {
	const startDate = new Date(year, 0, 1); // January 1st
	const endDate = new Date(year, 11, 31); // December 31st

	const dates: [string, string][] = [];
	const currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		const rangeStart = currentDate.toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
		currentDate.setDate(currentDate.getDate() + (range - 1)); // Add 89 days to the current date
		const rangeEnd = currentDate.toISOString().slice(0, 10);
		dates.push([rangeStart, rangeEnd]);
		currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
	}

	return dates;
}
