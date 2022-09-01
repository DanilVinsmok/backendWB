import { getNameProduct } from "../../dbQueries/dictionaryProducts";
import { IReport, ReportOneName } from "../../interface/processing/IReport";

export default async function designerReport(reportMap: Map<string, number>, All: number, numberOfDays: number, titleBrand: string): Promise<IReport> {
    const frequencyDamAndRate: ReportOneName[] = []
    for (const report of reportMap) {
        const product = await getNameProduct(report[0])
        const name = (product?.product) || report[0]
        const rate: ReportOneName = {
            name: name,
            demandRate: String(report[1] / numberOfDays)
        }
        frequencyDamAndRate.push(rate)
    }
    const generalDamAndRate: ReportOneName = {
        name: titleBrand,
        demandRate: String(All / numberOfDays)
    }
    const Report: IReport = {
        frequencyDamAndRate: frequencyDamAndRate,
        generalDamAndRate: generalDamAndRate
    }
    return Report
}