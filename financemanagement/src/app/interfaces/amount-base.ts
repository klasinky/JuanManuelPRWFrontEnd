export interface AmountBase {
    name: string,
    description: string,
    amount:number,
    url?:string
    created_at?: Date
}

export interface AmountList{
    data: AmountBase,
    is_expense?: boolean
}
