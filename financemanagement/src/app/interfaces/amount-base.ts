import { Category } from "./category";

export interface AmountBase {
    name: string,
    description: string,
    amount:number,
    url?:string,
    created_at?: Date,
    category: Category,
}

export interface AmountList{
    data: AmountBase,
    is_expense?: boolean
}
