import { Router } from "express"
import orderController from "../controller/order.controller"


const router = Router()

router.get('/order/addAll', orderController.addAllOrder)
router.get('/order/date', orderController.getOrdersOfOneDateAndIdBrand)
router.get('/order/dates', orderController.getOrdersOfDatesAndIdBrand)

export default router