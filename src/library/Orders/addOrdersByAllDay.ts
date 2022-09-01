import { getOrderOfOdid, updateOrder, createOrder } from "../../dbQueries/ordersQueris"
import { IBrandModel } from "../../interface/db/IBrand"
import { IOrder } from "../../interface/processing/IOrder"
import { IWBOrder } from "../../wbApi1/inteface"
import { getDataOrdersAllTime } from "../../wbApi1/querisWB"



export default async function addOrdersByAllDay(brand: IBrandModel) {

    const lastDay = new Date()
    lastDay.setDate(lastDay.getDate() - 1)
    lastDay.setHours(0, 0, 0, 0)

    let update = 0
    let create = 0
    let count = 0

    const orders: IWBOrder[] = (await getDataOrdersAllTime(brand, '2020-01-01T00:00:00.000Z'))

    console.log(orders.length)
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
        if (new Date(newOrder.date) < lastDay) {
            const data = await getOrderOfOdid(newOrder.odid)
            if (data) {
                await updateOrder(newOrder)
                update++
            } else {
                await createOrder(newOrder)
                create++
            }
        } else {
            count++
        }
    }
    console.log('Update= ', update)
    console.log('Create= ', create)
    console.log('- = ', count, '\n')

    update = 0
    create = 0
    count = 0

}

