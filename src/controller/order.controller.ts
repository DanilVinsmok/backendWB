import { Request, Response } from 'express'
import { getBrandOfTitle } from '../dbQueries/brandsQueris'
import { getOrderOfDatesAndIdBrand } from '../dbQueries/ordersQueris'
import getStartAndFinishDayOfDate from '../library/Date/getStartAndFinishDayOfDate'
import getStartAndFinishDayOfDates from '../library/Date/getStartAndFinishDayOfDates'
import addOrdersByAllDay from '../library/Orders/addOrdersByAllDay'



class OrderController {

    async addAllOrder(req: Request, res: Response) {
        const { titleBrand } = req.query
        if (titleBrand && typeof (titleBrand) === 'string') {
            const brand = await getBrandOfTitle(titleBrand)
            await addOrdersByAllDay(brand)
            const otvet = 'Заказы бренда ' + brand.title + ' выгружены успешно'
            res.json(otvet)
        } else {
            res.json('Параметры указаны не верно')
        }
    }

    async getOrdersOfOneDateAndIdBrand(req: Request, res: Response) {
        const { date, titleBrand } = req.query
        if (titleBrand && typeof (titleBrand) === 'string' && date && typeof (date) === 'string') {
            const brand = await getBrandOfTitle(titleBrand)
            const { startDay, finishDay } = getStartAndFinishDayOfDate(date)
            const dataOrders = (await getOrderOfDatesAndIdBrand(startDay, finishDay, +brand.id))
            res.json(
                {
                    count: dataOrders.rowCount,
                    orders: dataOrders.rows
                }
            )
        } else {
            res.json('Параметры указаны не верно')
        }
    }

    async getOrdersOfDatesAndIdBrand(req: Request, res: Response) {
        const { start, finish, titleBrand } = req.query
        if (
            titleBrand && typeof (titleBrand) === 'string' &&
            start && typeof (start) === 'string' &&
            finish && typeof (finish) === 'string'
        ) {
            const brand = await getBrandOfTitle(titleBrand)
            const { startDay, finishDay } = getStartAndFinishDayOfDates(start, finish)

            const dataOrders = (await getOrderOfDatesAndIdBrand(startDay, finishDay, +brand.id))
            res.json(
                {
                    count: dataOrders.rowCount,
                    orders: dataOrders.rows
                }
            )
        } else {
            res.json('Параметры указаны не верно')
        }
    }
}

export default new OrderController



