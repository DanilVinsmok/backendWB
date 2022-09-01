import { getAllBrands } from "../dbQueries/brandsQueris";
import updateWarehouse from "../library/Warehouse/updateWarehouse";
import { Request, Response } from 'express'



class WarehouseController {
    async UpdateWarehouse(req: Request, res: Response) {
        const data = await getAllBrands()
        if (data.rowCount) {
            const brands = data.rows
            for (const brand of brands) {
                await updateWarehouse(brand)
            }
            res.json('Обнавление склада прошло успешно')
        } else {
            res.json('Нет брендов для обнавления')
        }

    }
}

export default new WarehouseController