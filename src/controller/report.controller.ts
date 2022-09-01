import { Request, Response } from 'express'
import { getOrdersInTimeZone } from '../dbQueries/transactionDb'
import getDataReportToDemandRate from '../library/Report/getDataReportToDemandRate'
import designerReport from '../library/Report/designerReportDemandRate'
import getStartAndFinishDayOfPeriod from '../library/Date/getStartAndFinishDayOfPeriod'
import { getBrandOfTitle } from '../dbQueries/brandsQueris'
import { getAllExampleWarehouseToIdBrand } from '../dbQueries/warehouseQueris'
import getDataReportToWarehouse from '../library/Report/getDataReportToWarehouse'
import designerReportWarehouse from '../library/Report/designerReportWarehouse'
import getDataReportToWarehouseBrand from '../library/Report/getDatareportToWarehouseBrand'
import designerFullReport from '../library/Report/disignerFullReport'
import getDataReportABC from '../library/Report/getDataReportABC'
import disignerReportABC from '../library/Report/disignerReportABC'



class ReportController {

    async getReportOneBrandToDemandRate(req: Request, res: Response) {
        const { numberOfDays, titleBrand } = req.query
        if (numberOfDays && typeof (titleBrand) === 'string' && titleBrand) {

            const { startDay, finishDay } = getStartAndFinishDayOfPeriod(+numberOfDays)

            const data = await getOrdersInTimeZone(startDay, finishDay, titleBrand)

            const dataReport = getDataReportToDemandRate(data)

            if (typeof (dataReport) != 'string') {
                const { reportMap, All } = dataReport

                const report = await designerReport(reportMap, All, +numberOfDays, titleBrand)

                res.json(report)
            } else {
                res.json(dataReport)//error
            }
        } else {
            res.json('Параметры указаны не верно')//error
        }
    }

    async getReportOneBrandToWarehouse(req: Request, res: Response) {
        const { titleBrand } = req.query
        if (typeof (titleBrand) === 'string' && titleBrand) {

            const idBrand = (await getBrandOfTitle(titleBrand)).id

            const data = (await getAllExampleWarehouseToIdBrand(idBrand)).rows

            const dataReport = getDataReportToWarehouse(data)

            const otvet = await designerReportWarehouse(dataReport)

            res.json(otvet)
        } else {
            res.json('Параметры указаны не верно')//error
        }
    }

    async getFullReport(req: Request, res: Response) {
        const { titleBrand, numberOfDays, necessaryRemainsOfDays } = req.query
        if (numberOfDays && typeof (titleBrand) === 'string' && titleBrand && necessaryRemainsOfDays) {

            const idBrand = (await getBrandOfTitle(titleBrand)).id
            const dataWarehouse = (await getAllExampleWarehouseToIdBrand(idBrand)).rows
            const dataReportWarehouse = getDataReportToWarehouseBrand(dataWarehouse)

            const { startDay, finishDay } = getStartAndFinishDayOfPeriod(+numberOfDays)
            const dataDemandRate = await getOrdersInTimeZone(startDay, finishDay, titleBrand)
            const dataReportDemandRate = getDataReportToDemandRate(dataDemandRate)

            const otvet = await designerFullReport(dataReportWarehouse, dataReportDemandRate, titleBrand, +numberOfDays, +necessaryRemainsOfDays)
            res.json(otvet)
        } else {
            res.json('Параметры указаны не верно')//error
        }
    }

    async getABCReport(req: Request, res: Response) {
        const { titleBrand, numberOfDays, ABC } = req.query
        if (numberOfDays && typeof (titleBrand) === 'string' && titleBrand && ABC && typeof (ABC) === 'string') {

            const idBrand = (await getBrandOfTitle(titleBrand)).id
            const { startDay, finishDay } = getStartAndFinishDayOfPeriod(+numberOfDays)
            const { allCount, data } = await getDataReportABC(idBrand, startDay, finishDay)

            const report = await disignerReportABC(allCount, data, ABC)

            res.json(report)
        } else {
            res.json('Параметры указаны не верно')//error
        }
    }

}

export default new ReportController