import {AmountBase} from './amount-base';

export interface Category {
    id:number,
    name: string,
    total_entries?:number,
    total_expenses?:number
}

export interface CategoryDetail{
    category: Category,
    category_data:{
        expenses: AmountBase[],
        entries: AmountBase[]
    }
}
