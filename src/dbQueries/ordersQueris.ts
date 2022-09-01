import { QueryResult } from "pg";
import pool from "../db";
import { IOrderModel } from "../interface/db/IOrder";
import { IOrder } from "../interface/processing/IOrder";


export async function createOrder(order: IOrder): Promise<QueryResult<IOrderModel>> {
    return (
        await pool
            .query
            (
                'INSERT INTO orders (gNumber,date,lastChangeDate,supplierArticle,techSize,barcode,totalPrice,discountPercent,warehouseName,oblast,incomeID,odid,nmid,subject,category,brand,is_cancel,sticker,idBrand) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *',
                [order.gNumber, order.date, order.lastChangeDate, order.supplierArticle, order.techSize,
                order.barcode, order.totalPrice, order.discountPercent, order.warehouseName, order.oblast,
                order.incomeID, order.odid, order.nmid, order.subject, order.category, order.brand,
                order.is_cancel, order.sticker, order.idBrand]
            )
    )
}

export async function updateOrder(order: IOrder): Promise<QueryResult<IOrderModel>> {
    return (
        await pool
            .query
            (
                'UPDATE orders SET date=$1,lastChangeDate=$2,supplierArticle=$3,techSize=$4,barcode=$5,totalPrice=$6,discountPercent=$7,warehouseName=$8,oblast=$9,incomeID=$10,gNumber=$19,nmid=$12,subject=$13,category=$14,brand=$15,is_cancel=$16,sticker=$17,idBrand=$18 WHERE odid=$11 RETURNING *',
                [order.date, order.lastChangeDate, order.supplierArticle, order.techSize,
                order.barcode, order.totalPrice, order.discountPercent, order.warehouseName, order.oblast,
                order.incomeID, order.odid, order.nmid, order.subject, order.category, order.brand,
                order.is_cancel, order.sticker, order.idBrand, order.gNumber]
            )
    )
}

export async function getOrderOfOdid(odid: number): Promise<IOrderModel> {
    const data: IOrderModel = (await pool.query('SELECT * FROM orders WHERE odid=$1', [odid])).rows[0]
    return (data)
}

export async function getOrderOfDatesAndIdBrand(startDay: string, finishDay: string, idBrand: number): Promise<QueryResult<IOrderModel>> {
    return (await pool.query('SELECT * FROM orders WHERE date>$1 AND date<$2 AND idbrand=$3', [startDay, finishDay, idBrand]))
}


