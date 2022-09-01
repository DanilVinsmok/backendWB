import IWarehouseModel from "../../interface/db/IWarehouse";
import { Products } from "../../interface/processing/IReport";

export default function getDataReportToWarehouse(data: IWarehouseModel[]): Map<string, Products> {
    const reportMap = new Map<string, Products>
    for (const exampleWarehouse of data) {
        const key = exampleWarehouse.warehousename
        if (reportMap.has(key)) {
            const product = reportMap.get(key)
            if (product != undefined) {
                product.productsMap.set(String(exampleWarehouse.nmid), exampleWarehouse.quantity + exampleWarehouse.inwayfromclient)
                reportMap.set(key, product)
            }
        } else {
            const product = {} as Products
            const map = new Map<string, number>()
            map.set(String(exampleWarehouse.nmid), exampleWarehouse.quantity + exampleWarehouse.inwayfromclient)
            product.productsMap = map
            reportMap.set(key, product)
        }
    }
    return (reportMap)
}
