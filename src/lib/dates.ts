/**
 * A file for standardizing and working with dates in this project
 */

/** yearMothFormatToDate()
 *      This function will convert YYYY-MM formated date strings to Date Objects
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