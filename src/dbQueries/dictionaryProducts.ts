import pool from "../db";
import IProduct from "../interface/processing/IProduct";

export async function getNameProduct(nmid: string): Promise<IProduct | undefined> {

    return (
        (await pool.
            query('SELECT product FROM dictionaryproducts WHERE nmid=$1', [nmid])).rows[0]
    )
}