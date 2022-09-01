import { Router } from "express"
import BrandController from "../controller/brand.controller"



const router = Router()

router.post('/brand', BrandController.createBrand)
router.get('/brand', BrandController.getBrands)
router.get('/brand/title', BrandController.getBrand)
router.put('/brand', BrandController.updateBrand)
router.delete('/brand/title', BrandController.deleteBrand)


export default router