import { getNameProduct } from "../../dbQueries/dictionaryProducts";
import { Products } from "../../interface/processing/IReport";
import { IDataReportToDemandRate } from '../../interface/processing/IReport'


interface warehouse {
    nameProduct: string, //название продукта
    demandRate: number, // скорость спроса
    count: number,      //остатков штук
    remainsOfDays: number, //остатков дней
    necessaryCount: number, // необходимое остатков штук 
    requirement: number  //необходимо докупить 
}

interface IFullReport {
    nameBrand: string,
    warehouse: warehouse[]
}

export default async function designerFullReport
    (
        dataReportWarehouseBrand: Map<string, number>,
        dataReportDemandRate: string | IDataReportToDemandRate,
        nameBrand: string,
        numberOfDays: number,
        necessaryRemainsOfDays: number
    ): Promise<string | IFullReport> {
    if (typeof (dataReportDemandRate) != 'string') {
        const otshet = {} as IFullReport
        const wh: warehouse[] = []
        otshet.nameBrand = nameBrand
        for (const exampleDemandBrand of dataReportDemandRate.reportMap) {
            const exampleWarehouse = {} as warehouse
            const nmId = exampleDemandBrand[0]
            const demandRate = exampleDemandBrand[1] / numberOfDays
            exampleWarehouse.nameProduct = (await getNameProduct(nmId))?.product || nmId
            exampleWarehouse.demandRate = demandRate
            const exampleWarehouseBrand = dataReportWarehouseBrand.get(nmId)
            if (exampleWarehouseBrand) {
                exampleWarehouse.count = exampleWarehouseBrand
                exampleWarehouse.remainsOfDays = Math.round(exampleWarehouseBrand / demandRate)
            } else {
                exampleWarehouse.count = 0
                exampleWarehouse.remainsOfDays = 0
            }
            exampleWarehouse.necessaryCount = Math.ceil(necessaryRemainsOfDays * exampleWarehouse.demandRate)
            exampleWarehouse.requirement = exampleWarehouse.necessaryCount - exampleWarehouse.count
            wh.push(exampleWarehouse)
            otshet.warehouse = wh
        }
        return (otshet)
    } else {
        return (dataReportDemandRate)
    }
}