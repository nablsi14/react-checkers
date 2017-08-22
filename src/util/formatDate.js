/**
 * Takes a Date Object and returns a string in the form of
 * Month/Day/Year at Hours:Minutes(AM/PM)
 * @param {Date} date - The Date Object to format.
 * @throws {TypeError} - When a non-Date Object is passed.
 * @return {String}
 */
const formatDate = date => {
    if (!(date instanceof Date))
        throw new TypeError("argument 'date' must be of type Date");
    let day = addZero(date.getDate());
    let hours = (() => {
        let h = date.getHours();
        if (h > 12) {
            return addZero(h - 12);
        } else if (h === 0) 
            return 12;
        return addZero(h);
    })();
    let mins = addZero(date.getMinutes());
    let month = addZero(date.getMonth() + 1);
    let period = date.getHours() > 12 ? "pm" : "am";
    let year = date.getFullYear().toString().slice(2);
    
    return `${month}/${day}/${year} at ${hours}:${mins}${period}`;
}
function addZero(num) {
    if (num < 10)
        num = `0${num}`;
    return num;
}
export default formatDate;