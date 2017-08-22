/**
 * Takes a Date Object and returns a string in the form of
 * Month/Day/Year at Hours:Minutes(AM/PM)
 * @param {Date} date - The Date Object to format.
 * @throws {TypeError} - When a non-Date Object is passed.
 * @return {String}
 */
const formatDate = date => {
    if (!(date instanceof Date))
        throw new TypeError("Argument 'date' must be of type Date");
    
    const day = addZero(date.getDate());
    const hours = (() => {
        const h = date.getHours();
        if (h > 12)
            return addZero(h - 12);
        else if (h === 0) 
            return 12;
        return addZero(h);
    })();
    const mins = addZero(date.getMinutes());
    const month = addZero(date.getMonth() + 1);
    const period = date.getHours() > 12 ? "pm" : "am";
    const year = date.getFullYear().toString().slice(2);
    
    return `${month}/${day}/${year} at ${hours}:${mins}${period}`;
}
/**
 * Adds a leading 0 to a number if it is only on one digit.
 * @param {number} num - The number to add the leading 0 to.
 * @return {String}
 */
const addZero = num => (num < 10) ? `0${num}` : num.toString();

export default formatDate;