/**
 * A file for standardizing and working with dates in this project
 */


/**
 * This function will convert YYYY-MM formated date strings to Date Objects
 * @param dateStr 
 * @returns yearMonthDate
 */
function yearMonthFormatToDate(dateStr: string): Date {
    const [year, month] = dateStr.split('-')
    const numYear = Number(year)
    const numMonth = Number(month)

    if (!year || !month || year === undefined || month === undefined){
        throw new Error("Invalid yearMonth date passed to yearMonthFormatToDate");
    } 
    return new Date(numYear, numMonth)
}

/**
 * converts a date to string which contains a month and date which will be used for display
 * @param date 
 * @returns displayString
 */
function convertDateToMonthYearDateDisplayStr(date: Date): string {
    let displayStr = "";
    
    const dateString = date.toDateString()
    const dateStringList = dateString.split(" ");

    if (dateStringList.length === 4) {
        // toDateString() should return "Day Month DayInMonth Year"
        const month = dateStringList[1]
        const year = dateStringList[3]
        displayStr += month;

        // add period indicating contraction if month word length greater than 4
        if (month.toLowerCase() !== "may" || 
            month.toLowerCase() !== "june" || 
            month.toLowerCase() !== "july") {
                displayStr += ".";
        }
        displayStr += (" " + year);
    }
    return displayStr;
}

export {
    yearMonthFormatToDate,
    convertDateToMonthYearDateDisplayStr
}