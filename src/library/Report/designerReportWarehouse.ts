import { getNameProduct } from "../../dbQueries/dictionaryProducts";
import { IProductWarehouse, IReportWarehouse, Products } from "../../interface/processing/IReport";



export default async function designerReportWarehouse(dataReport: Map<string, Products>) {
    const allWarehouse: IReportWarehouse[] = []
    for (const row of dataReport) {
        const nameWarehouse = row[0]
        let products: IProductWarehouse[] = []
        let product = {} as IProductWarehouse
        for (const str of row[1].productsMap) {
            product = {
                nameProduct: (await getNameProduct(str[0]))?.product || str[0],
                count: str[1]
            }
            products.push(product)
        }
        const warehouse: IReportWarehouse = {
            nameWarehouse: nameWarehouse,
            product: products
        }
        allWarehouse.push(warehouse)
    }
    return (allWarehouse)
}