import { createExampleWarehouse, getExampleWarehouseTonmIdAndWarehous, updateExampleWarehouse } from "../../dbQueries/warehouseQueris";
import { IBrandModel } from "../../interface/db/IBrand";
import IWarehouse from "../../interface/processing/IWarehouse";
import { getDataWarehouse } from "../../wbApi1/querisWB";


export default async function updateWarehouse(brand: IBrandModel) {
    const data = await getDataWarehouse(brand)

    const idBrand = brand.id

    let dataLength = data.length
    let update = 0
    let create = 0

    for (const exampleData of data) {
        const newExamle: IWarehouse =
        {
            lastChangeDate: exampleData.lastChangeDate,
            supplierArticle: exampleData.supplierArticle,
            techSize: exampleData.techSize,
            barcode: exampleData.barcode,
            quantity: exampleData.quantity,
            isSupply: exampleData.isSupply,
            isRealization: exampleData.isRealization,
            quantityFull: exampleData.quantityFull,
            quantityNotInOrders: exampleData.quantityNotInOrders,
            warehouse: exampleData.warehouse,
            warehouseName: exampleData.warehouseName,
            inWayToClient: exampleData.inWayToClient,
            inWayFromClient: exampleData.inWayFromClient,
            nmId: exampleData.nmId,
            subject: exampleData.subject,
            category: exampleData.category,
            daysOnSite: exampleData.daysOnSite,
            brand: exampleData.brand,
            SCCode: exampleData.SCCode,
            Price: exampleData.Price,
            Discount: exampleData.Discount,
            idBrand: idBrand
        }

        const { nmId, warehouse } = exampleData

        const example = await getExampleWarehouseTonmIdAndWarehous(nmId, warehouse)

        if (example.rowCount == 0) {

            await createExampleWarehouse(newExamle)
            create++
        } else {
            await updateExampleWarehouse(newExamle)
            update++
        }
    }
    console.log
        (
            '\n' +
            'Склад' + '\n' +
            'Всего:' + dataLength + '\n' +
            'Создано:' + create + '\n' +
            'Обнавлино:' + update + '\n'
        )

}