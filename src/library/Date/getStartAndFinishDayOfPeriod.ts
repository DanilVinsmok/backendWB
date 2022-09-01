import ITimeInterval from "./interfase"

export default function getStartAndFinishDayOfPeriod(period: number): ITimeInterval {
    const startDay = new Date()
    startDay.setDate(startDay.getDate() - (+period))
    startDay.setHours(0, 0, 0, 0)

    const finishDay = new Date()
    finishDay.setDate(finishDay.getDate() - 1)
    finishDay.setHours(23, 59, 59, 999)

    return ({
        startDay: startDay.toISOString(),
        finishDay: finishDay.toISOString()
    })
}