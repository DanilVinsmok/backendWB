import { create } from "ts-node";
import { getTimeoutBrands, updateBrand } from "../../dbQueries/brandsQueris";
import { createOrder, getOrderOfOdid, updateOrder } from "../../dbQueries/ordersQueris";
import { IBrandModel } from "../../interface/db/IBrand";
import { IOrder } from "../../interface/processing/IOrder";
import { IWBOrder } from "../../wbApi1/inteface";
import { getDataOrdersDay } from "../../wbApi1/querisWB";


export default async function addOrdersByOneDay() {

    const date: Date = new Date()
    date.setDate(date.getDate() - 1)

    const nowDate: string = new Date().toISOString()

    const brands: IBrandModel[] = await getTimeoutBrands(date.toISOString())
    let count = 0

    for (const brand of brands) {
        const orders: IWBOrder[] = (await getDataOrdersDay(brand))
        for (const order of orders) {
            const newOrder: IOrder = {
                gNumber: order.gNumber,
                date: order.date,
                lastChangeDate: order.lastChangeDate,
                supplierArticle: order.supplierArticle,
                techSize: order.techSize,
                barcode: order.barcode,
                totalPrice: order.totalPrice,
                discountPercent: order.discountPercent,
                warehouseName: order.warehouseName,
                oblast: order.oblast,
                incomeID: order.incomeID,
                odid: order.odid,
                nmid: order.nmId,
                subject: order.subject,
                category: order.category,
                brand: order.brand,
                is_cancel: order.isCancel,
                sticker: order.sticker,
                idBrand: brand.id,
            }
            const data = await getOrderOfOdid(newOrder.odid)
            if (data) {
                console.log('odid совпал')
                newOrder.odid = Number(new Date())
                await createOrder(newOrder)
            } else {
                await createOrder(newOrder)
            }
            count++
        }
        brand.expirationdate = nowDate
        await updateBrand(brand)
    }

    if (brands.length > 0) {
        console.log('Заказы добавлены ' + '\n' + new Date(nowDate) + '\n' + '= ' + count + '\n')
        count = 0
    } else {
        console.log('Пока обновлять нечего ' + '\n' + new Date(nowDate) + '\n')
    }
}