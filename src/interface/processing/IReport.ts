
export interface ReportOneName {
    name: string,
    demandRate: string
}

export interface IReport {
    frequencyDamAndRate: ReportOneName[],
    generalDamAndRate: ReportOneName
}

export interface Products {
    productsMap: Map<string, number>
}

export interface IProductWarehouse {
    nameProduct: string,
    count: number
}

export interface IReportWarehouse {
    nameWarehouse: string,
    product: IProductWarehouse[]
}

export interface IDataReportToDemandRate {
    reportMap: Map<string, number>,
    All: number
}