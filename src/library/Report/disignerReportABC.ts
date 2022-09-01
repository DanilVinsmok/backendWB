import { getNameProduct } from "../../dbQueries/dictionaryProducts";


interface IABCReport {
    name: string;
    count: number;
    shareOfSales: number;
    increasingShareOfSales: number;
    ABCClass: "A" | "B" | "C";
}

export default async function disignerReportABC(allCount: number, data: { key: string; value: number; }[], ABC: string) {
    const report: IABCReport[] = []

    let prev: number = 0

    for (const product of data) {
        const name = await getNameProduct(product.key)
        const increasingShareOfSales = ((prev + product.value) / allCount) * 100
        const item: IABCReport = {
            name: name?.product || product.key,
            count: product.value,
            shareOfSales: product.value / allCount * 100,
            increasingShareOfSales: increasingShareOfSales,
            ABCClass: FABC(increasingShareOfSales, ABC)
        }
        prev += product.value
        report.push(item)
    }
    return (report)
}

function FABC(value: number, ABC: string): "A" | "B" | "C" {
    const abcStr = ABC.split('–')
    const abcNumber = abcStr.map((item) => +item)
    return (value < abcNumber[0]) ? 'A' : ((value < abcNumber[0] + abcNumber[1]) ? 'B' : 'C')
}