import { QueryResult } from "pg";
import { IOrderModel } from "../../interface/db/IOrder";
import { IDataReportToDemandRate } from "../../interface/processing/IReport";



export default function getDataReportToDemandRate(data: string | QueryResult<IOrderModel>): string | IDataReportToDemandRate {
    if (typeof (data) != 'string') {
        const reportMap = new Map<string, number>()
        const orders = data.rows
        const ALL = data.rowCount
        for (const order of orders) {
            const key = String(order.nmid)
            if (!reportMap.has(key)) {
                reportMap.set(key, 1)
            } else {
                const value = reportMap.get(key)
                if (value) reportMap.set(key, value + 1)
            }
        }
        return { reportMap: reportMap, All: ALL }
    }
    return (data)
}