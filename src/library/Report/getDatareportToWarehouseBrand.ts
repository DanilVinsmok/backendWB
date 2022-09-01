import IWarehouseModel from "../../interface/db/IWarehouse";


export default function getDataReportToWarehouseBrand(dataWarehouse: IWarehouseModel[]): Map<string, number> {
    const brandWarehouse = new Map<string, number>
    for (const example of dataWarehouse) {
        const key = String(example.nmid)
        if (brandWarehouse.has(key)) {
            const count = brandWarehouse.get(key)
            if (count) {
                brandWarehouse.set(key, count + example.quantity + example.inwayfromclient)
            }
        } else {
            brandWarehouse.set(key, example.quantity + example.inwayfromclient)
        }
    }
    return (brandWarehouse)
}