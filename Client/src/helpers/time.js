// format java Instant to a date for posts and comments
export const createdTime = date => {
	let representDate = new Date(
		date.replace(' Israel Standard Time', '').replace(' at', '')
	).toUTCString()

	return representDate.slice(0, representDate.length - 7)
}

// format time to mm/dd/yyyy, hh:mm
export const createdTimeLocal = date => {
	let representDate = new Date(
		date.replace(' Israel Standard Time', '').replace(' at', '')
	).toLocaleString()

	return representDate.slice(0, representDate.length - 6)
}

// format java Instant to a date for posts and comments
export const createdTimeShort = date => {
	let representDate = new Date(
		date.replace(' Israel Standard Time', '').replace(' at', '')
	).toLocaleDateString()

	let representTime = new Date(
		date.replace(' Israel Standard Time', '').replace(' at', '')
	)
		.toTimeString()
		.substr(0, 5)

	let dateString = representDate.substring(
		representDate.length - 2,
		representDate.length
	)
	const finalDateString = representDate.replace(dateString, '')

	return `${finalDateString}, ${representTime}`
}
