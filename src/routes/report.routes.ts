import { Router } from "express"
import ReportController from "../controller/report.controller"



const router = Router()

router.get('/brand/demand/rate', ReportController.getReportOneBrandToDemandRate)
router.get('/report/warehouse', ReportController.getReportOneBrandToWarehouse)
router.get('/report/full', ReportController.getFullReport)
router.get('/report/ABC', ReportController.getABCReport)



export default router