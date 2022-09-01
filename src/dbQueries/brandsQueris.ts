import { QueryResult } from "pg";
import pool from "../db";
import { IBrandModel } from "../interface/db/IBrand";
import { IBrand } from "../interface/processing/IBrand";



export async function createBrand(brand: IBrand): Promise<QueryResult<IBrandModel>> {
    return (
        await pool
            .query(
                'INSERT INTO brands (title,apiKeyOne,apiKeyTwo,expirationDate) values ($1,$2,$3,$4) RETURNING *',
                [brand.title, brand.apiKeyOne, brand.apiKeyTwo, brand.expirationDate]
            )
    )
}

export async function getAllBrands(): Promise<QueryResult<IBrandModel>> {
    return (
        await pool.query('SELECT * FROM brands')
    )
}

export async function getBrand(id: string): Promise<QueryResult<IBrandModel>> {
    return (
        await pool.query('SELECT * FROM brands WHERE id=$1', [id])
    )
}

export async function updateBrand(brand: IBrandModel): Promise<QueryResult<IBrandModel>> {
    return (
        await pool
            .query(
                'UPDATE brands SET title=$1, apiKeyOne=$2, apiKeyTwo=$3, expirationDate=$4 WHERE id=$5 RETURNING *',
                [brand.title, brand.apikeyone, brand.apikeytwo, brand.expirationdate, brand.id]
            )
    )
}

export async function deleteBrand(title: string) {
    return ((await pool.query('DELETE FROM brands WHERE title=$1 RETURNING *', [title])).rows[0])

}

export async function getTimeoutBrands(yesterday: string): Promise<IBrandModel[]> {
    return (await pool.query('SELECT * FROM brands WHERE expirationDate<$1', [yesterday])).rows
}

export async function getBrandOfTitle(titleBrand: string): Promise<IBrandModel> {
    return (await pool.query<IBrandModel>('SELECT * FROM brands WHERE title=$1', [titleBrand])).rows[0]
}