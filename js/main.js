let mainTimer = document.querySelector('.online__ms'),
	mainTime = document.querySelector('.online__date span'),
	table = document.querySelector('.table1'),
	table2 = document.querySelector('.table2')

let mainTimerId = setInterval(() => {
	let date = new Date()
	mainTimer.innerHTML = Math.trunc(date / 1000)
	mainTime.innerHTML = getTime(date, false)
}, 1000)

function getTime(ms, utc0) {
	if (utc0) {
		return `${getZero(ms.getUTCHours())}:${getZero(
			ms.getUTCMinutes()
		)}:${getZero(ms.getUTCSeconds())}`
	} else {
		return `${getZero(ms.getHours())}:${getZero(ms.getMinutes())}:${getZero(
			ms.getSeconds()
		)}`
	}
}

function getZero(num) {
	if (num < 10) {
		return `0${num}`
	} else {
		return num
	}
}

function getDayName(num) {
	let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	return days[num]
}

function getMonthName(num) {
	let months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'July',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	return months[num]
}

function getNewDate(value) {
	return new Date(value * 1000)
}

function getTZOffset(time) {
	let offset = getNewDate(time).getTimezoneOffset() / 60

	return offset > 0
		? `-${getZero(Math.abs(offset))}00`
		: `+${getZero(Math.abs(offset))}00`
}

function getOffsetDate(time) {
	let offset = new Date(+time * 1000)
	let now = new Date()
	let years = offset.getFullYear() - now.getFullYear(),
		month = offset.getMonth() - now.getMonth(),
		day = offset.getDate() - now.getDate(),
		hours = offset.getHours() - now.getHours(),
		minutes = offset.getMinutes() - now.getMinutes(),
		seconds = offset.getSeconds() - now.getSeconds()

	if (years) {
		if (years > 0) {
			return `in ${years} years`
		} else {
			return `${Math.abs(years)} years ago`
		}
	} else if (month) {
		if (month > 0) {
			return `in ${month} months`
		} else {
			return `${Math.abs(month)} months ago`
		}
	} else if (day) {
		if (day > 0) {
			return `in ${day} day`
		} else {
			return `${Math.abs(day)} day ago`
		}
	} else if (hours) {
		if (hours > 0) {
			return `in ${hours} hours`
		} else {
			return `${Math.abs(hours)} hours ago`
		}
	} else if (minutes) {
		if (minutes > 0) {
			return `in ${minutes} minutes`
		} else {
			return `${Math.abs(minutes)} minutes ago`
		}
	} else if (seconds) {
		if (seconds > 0) {
			return `in ${seconds} seconds`
		} else {
			return `${Math.abs(seconds)} seconds ago`
		}
	}
}

function getInpsValues(
	yearSelector,
	monthSelector,
	daySelector,
	hoursSelector,
	minutesSelector,
	secondsSelector
) {
	let year = +document.querySelector('#' + yearSelector).value
	let month = +document.querySelector('#' + monthSelector).value
	let day = +document.querySelector('#' + daySelector).value
	let hours = +document.querySelector('#' + hoursSelector).value
	let minutes = +document.querySelector('#' + minutesSelector).value
	let seconds = +document.querySelector('#' + secondsSelector).value
	let date = Date.parse(new Date(year, month, day, hours, minutes, seconds))
	console.log(date)
	return date / 1000
}

function getTimestampInfo(inp, firstInp) {
	let timeInpValue = firstInp
		? +document.querySelector('.' + inp).value
		: getInpsValues('year', 'month', 'day', 'hours', 'minutes', 'seconds')
	// let timeInpValue = 1794904479

	return `
        <tbody>
            <tr>
                <th>Format</th>
                <td>Seconds</td>
            </tr>
            <tr>
                <th>GMT</th>
                <td>${getDayName(getNewDate(timeInpValue).getUTCDay())}
                    ${getMonthName(getNewDate(timeInpValue).getUTCMonth())}
                    ${getNewDate(timeInpValue).getUTCDate()}
                    ${getNewDate(timeInpValue).getUTCFullYear()}
                    ${getTime(getNewDate(timeInpValue), true)}
                    GMT+0000
                </td>
            </tr>
            <tr>
                <th>Your Time Zone</th>
                <td>
                    ${getDayName(getNewDate(timeInpValue).getDay())}
                    ${getMonthName(getNewDate(timeInpValue).getMonth())}
                    ${getNewDate(timeInpValue).getDate()}
                    ${getNewDate(timeInpValue).getFullYear()}
                    ${getTime(getNewDate(timeInpValue), false)}
                    GMT${getTZOffset(timeInpValue)}
                </td>
            </tr>
            <tr>
                <th>Relative</th>
                <td>${getOffsetDate(timeInpValue)}</td>
            </tr>
        </tbody>
    `
}

document.querySelector('.btn1').addEventListener('click', () => {
	table.innerHTML = getTimestampInfo('online__seconds', true)
})

document.querySelector('.btn2').addEventListener('click', () => {
	table2.innerHTML = getTimestampInfo('', false)
})
