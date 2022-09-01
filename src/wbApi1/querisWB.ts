import axios from 'axios'
import { IBrandModel } from '../interface/db/IBrand'
import { IWBOrder, IWBWarehouse } from './inteface'


export async function getDataOrdersDay(brand: IBrandModel): Promise<IWBOrder[]> {
    const { apikeyone, expirationdate } = brand
    const date: string = new Date(expirationdate).toISOString()
    return (await axios.get<IWBOrder[]>(`https://suppliers-stats.wildberries.ru/api/v1/supplier/orders?dateFrom=${date}&flag=1&key=${apikeyone}`)).data
}

export async function getDataOrdersAllTime(brand: IBrandModel, lastDate: string): Promise<IWBOrder[]> {
    const { apikeyone } = brand
    const data = await axios.get<IWBOrder[]>(`https://suppliers-stats.wildberries.ru/api/v1/supplier/orders?dateFrom=${lastDate}&flag=0&key=${apikeyone}`)
    return (data).data
}

export async function getDataWarehouse(brand: IBrandModel): Promise<IWBWarehouse[]> {
    const { apikeyone } = brand
    const date = new Date()
    date.setDate(date.getDate() - 2)
    let data = (await axios.get<IWBWarehouse[]>(`https://suppliers-stats.wildberries.ru/api/v1/supplier/stocks?dateFrom=${date.toISOString()}&key=${apikeyone}`)).data
    return (data)

}