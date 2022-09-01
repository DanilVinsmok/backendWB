import { Request, Response } from 'express'
import {
    createBrand,
    deleteBrand,
    getAllBrands,
    getBrand,
    getBrandOfTitle,
    updateBrand
} from '../dbQueries/brandsQueris'
import { IBrand } from '../interface/processing/IBrand'
import { IBrandModel } from '../interface/db/IBrand'
import { IBrandDto } from '../interface/dto/IBrand'

class BrandController {
    async createBrand(req: Request, res: Response): Promise<void> {
        const brand: IBrandDto = req.body
        const newBrand: IBrand = {
            title: brand.title,
            apiKeyOne: brand.apiKeyOne,
            apiKeyTwo: brand.apiKeyTwo,
            expirationDate: new Date().toISOString()
        }

        res.json((await createBrand(newBrand)).rows[0])
    }

    async getBrands(req: Request, res: Response): Promise<void> {
        res.json((await getAllBrands()).rows)
    }

    async getBrand(req: Request, res: Response): Promise<void> {
        const { title } = req.query
        if (typeof (title) === 'string')
            res.json((await getBrandOfTitle(title)))
        else res.json('бренда с таким именем нет')
    }

    async updateBrand(req: Request, res: Response): Promise<void> {
        const brand = req.body
        const newBrand: IBrandModel = {
            id: brand.id,
            title: brand.title,
            apikeyone: brand.apikeyone,
            apikeytwo: brand.apikeytwo,
            expirationdate: new Date().toISOString()
        }
        res.json((await updateBrand(newBrand)).rows[0])
    }

    async deleteBrand(req: Request, res: Response): Promise<void> {
        const { title } = req.body
        res.json(await deleteBrand(title))
    }
}

export default new BrandController