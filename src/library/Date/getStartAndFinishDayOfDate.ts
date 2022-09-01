import ITimeInterval from "./interfase"

export default function getStartAndFinishDayOfDate(date: string): ITimeInterval {
    const startDay = new Date(date)
    startDay.setHours(0, 0, 0, 0)

    const finishDay = new Date(startDay)
    finishDay.setHours(23, 59, 59, 999)

    return ({
        startDay: startDay.toISOString(),
        finishDay: finishDay.toISOString()
    })
}