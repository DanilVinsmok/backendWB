export default interface IWarehouse {
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
    Discount: number,
    idBrand: string
}