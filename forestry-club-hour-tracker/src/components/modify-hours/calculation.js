import dayjs from "dayjs";

/**
 * converts datetime object to respective human-readable time (hour, minute, and meridiem) string
 *
 * @param time
 *      A Date or DayJS date object
 * @returns {string}
 *      Example string: 10:00 PM
 */
export const formatAsTimeString = (time) => {
    return time.format('hh:mm A')
}

/**
 * converts "milliseconds since epoch" value into hours and rounds
 * to tenth decimal point (6 minutes = 0.1, 12 minutes = 0.2, etc.)
 *
 * @param startTime
 *      A Date or DayJS date object representing the beginning of hours worked
 * @param endTime
 *      A Date or DayJS date object representing the end of hours worked
 * @returns {number}
 *      Example: 08:00 PM - 10:24 PM = 1.4 hours
 *
 */
export const calculateRoundedHours = (startTime, endTime) => {
    let hoursWithoutDecimal = Math.round((endTime - startTime) / 36000) / 100
    return Math.round(hoursWithoutDecimal) + Math.round((hoursWithoutDecimal - Math.round(hoursWithoutDecimal)) * 10) / 10
}

/**
 * combines two Date objects (date of first and time of second) and outputs ISO 8601 string representation.
 * @param date
 *      A Date or DayJS date object to use for 'date value'
 * @param time
 *      A Date or DayJS date object to use for 'time value'
 * @returns {string}
 *      ISO 8601 formatted string of the new date
 */
export const combineDateAndTimeObjects = (date, time) => {
    return dayjs(date).set('hour', time.hour()).set('minute', time.minute()).set('second', 0).format();
}