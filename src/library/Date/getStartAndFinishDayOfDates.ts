import ITimeInterval from "./interfase"


export default function getStartAndFinishDayOfDates(start: string, finish: string): ITimeInterval {
    const startDay = new Date(start)
    startDay.setHours(0, 0, 0, 0)

    const finishDay = new Date(finish)
    finishDay.setHours(23, 59, 59, 999)

    return ({
        startDay: startDay.toISOString(),
        finishDay: finishDay.toISOString()
    })
}