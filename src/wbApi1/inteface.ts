export interface IWBOrder {
    gNumber: string,
    date: string,
    lastChangeDate: string,
    supplierArticle: string,
    techSize: string,
    barcode: string,
    totalPrice: number,
    discountPercent: number,
    warehouseName: string,
    oblast: string,
    incomeID: number,
    odid: number,
    nmId: number,
    subject: string,
    category: string,
    brand: string,
    isCancel: boolean,
    sticker: string
}

export interface IWBWarehouse {
    lastChangeDate: string,
    supplierArticle: string,
    techSize: string,
    barcode: string,
    quantity: number,
    isSupply: boolean,
    isRealization: boolean,
    quantityFull: number,
    quantityNotInOrders: number,
    warehouse: string,
    warehouseName: string,
    inWayToClient: number,
    inWayFromClient: number,
    nmId: number,
    subject: string,
    category: string,
    daysOnSite: number,
    brand: string,
    SCCode: string,
    Price: number,
    Discount: number
}