const fakeDateForComparation = '01/01/2020'


export const startTimeGreaterThenEndTime = (startTime: string, endTime: string) => {
    return (Date.parse(`${fakeDateForComparation} ${startTime}`)
        > Date.parse(`${fakeDateForComparation} ${endTime}`))
}

export const equalDate = (startDate: Date, endDate: Date) => {
    return (endDate.getFullYear() === startDate.getFullYear() &&
        endDate.getMonth() === startDate.getMonth() &&
        endDate.getDate() === startDate.getDate())
}

export const startDateBeforeEndDate = (startDate: Date, endDate: Date) => {
    if (startDate.getFullYear() > endDate.getFullYear()) {
        return true;
    }
    if (startDate.getMonth() > endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
        return true;
    }
    if (startDate.getDate() > endDate.getDate() && startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
        return true;
    }
    return false;
}
