import { getOrderOfDatesAndIdBrand } from "../../dbQueries/ordersQueris";


export default async function getDataReportABC(idBrand: string, startDay: string, finishDay: string):
    Promise<{
        data: { key: string; value: number; }[];
        allCount: number;
    }> {

    const dataOrdersCount = new Map<string, number>
    const dataOrders = await getOrderOfDatesAndIdBrand(startDay, finishDay, +idBrand)

    for (const order of dataOrders.rows) {
        const key = String(order.nmid)
        if (dataOrdersCount.has(key)) {
            let value = dataOrdersCount.get(key)
            if (value != undefined) {
                value = value + 1
                dataOrdersCount.set(key, value)
            }
        } else {
            dataOrdersCount.set(key, 1)
        }
    }

    const arrayOrderCount = Array.from(dataOrdersCount, ([key, value]) => ({ key, value }))

    arrayOrderCount.sort((a, b) => b.value - a.value)
    return { data: arrayOrderCount, allCount: dataOrders.rowCount }

}