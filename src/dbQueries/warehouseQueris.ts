import { QueryResult } from "pg";
import pool from "../db";
import IWarehouseModel from "../interface/db/IWarehouse";
import IWarehouse from "../interface/processing/IWarehouse";


export async function createExampleWarehouse(example: IWarehouse): Promise<QueryResult<IWarehouseModel>> {
    const columns = 'lastChangeDate,supplierArticle,techSize,barcode,quantity,isSupply,isRealization,quantityFull,quantityNotInOrders,warehouse,warehouseName,inWayToClient,inWayFromClient,nmId,subject,category,daysOnSite,brand,SCCode,Price,Discount,idBrand'
    const values = '$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22'
    return (
        await pool
            .query
            (
                'INSERT INTO warehouse (' + columns + ') values (' + values + ') RETURNING *',
                [
                    example.lastChangeDate, example.supplierArticle, example.techSize, example.barcode, example.quantity,
                    example.isSupply, example.isRealization, example.quantityFull, example.quantityNotInOrders, example.warehouse,
                    example.warehouseName, example.inWayToClient, example.inWayFromClient, example.nmId, example.subject, example.category,
                    example.daysOnSite, example.brand, example.SCCode, example.Price, example.Discount, example.idBrand
                ]
            )
    )
}

export async function updateExampleWarehouse(example: IWarehouse): Promise<QueryResult<IWarehouseModel>> {
    const columns = 'lastChangeDate=$1,supplierArticle=$2,techSize=$3,barcode=$4,quantity=$5,isSupply=$6,isRealization=$7,quantityFull=$8,quantityNotInOrders=$9,warehouseName=$11,inWayToClient=$12,inWayFromClient=$13,subject=$15,category=$16,daysOnSite=$17,brand=$18,SCCode=$19,Price=$20,Discount=$21,idBrand=$22'
    const params = 'warehouse=$10 AND nmId=$14'
    return (
        await pool
            .query
            (
                'UPDATE warehouse SET ' + columns + ' WHERE ' + params + ' RETURNING *',
                [
                    example.lastChangeDate, example.supplierArticle, example.techSize, example.barcode, example.quantity,
                    example.isSupply, example.isRealization, example.quantityFull, example.quantityNotInOrders, example.warehouse,
                    example.warehouseName, example.inWayToClient, example.inWayFromClient, example.nmId, example.subject, example.category,
                    example.daysOnSite, example.brand, example.SCCode, example.Price, example.Discount, example.idBrand
                ]
            )
    )
}

export async function getExampleWarehouseTonmIdAndWarehous(nmid: number, warehouse: string): Promise<QueryResult<IWarehouseModel>> {
    return (
        await pool
            .query
            (
                'SELECT * FROM warehouse WHERE nmid=$1 AND warehouse=$2',
                [nmid, warehouse]
            )
    )
}

export async function getAllExampleWarehouseToIdBrand(idBrand: string): Promise<QueryResult<IWarehouseModel>> {
    return (
        await pool
            .query
            (
                'SELECT * FROM warehouse WHERE idBrand=$1',
                [idBrand]
            )
    )
}