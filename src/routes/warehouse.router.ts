import { Router } from "express"
import WarehouseController from "../controller/warehouse.controller"



const router = Router()

router.get('/wherehouse', WarehouseController.UpdateWarehouse)


export default router