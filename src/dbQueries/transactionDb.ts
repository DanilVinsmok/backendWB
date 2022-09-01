import { QueryResult } from "pg"
import pool from "../db"
import { IBrandModel } from "../interface/db/IBrand"
import { IOrderModel } from "../interface/db/IOrder"

export async function getOrdersInTimeZone(startDay: string, finishDay: string, titleBrand: string): Promise<string | QueryResult<IOrderModel>> {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const idBrand = ((await client.query<IBrandModel>('SELECT * FROM brands WHERE title=$1', [titleBrand])).rows)[0].id
        const orders = await client
            .query
            (
                'SELECT * FROM orders WHERE idbrand=$1 AND date>$2 AND date<$3',
                [idBrand, startDay, finishDay]
            )
        await client.query('COMMIT')
        return (orders)
    } catch (error) {
        await client.query('ROLLBACK')
        return (String(error))
    }

} 