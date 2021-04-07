export interface Months {
    date: string,
    total_entries: number,
    total_expenses: number,
    url?: string,
    id?:number
}

export interface MonthDetail{
    categories: String[],
    month: Months
}
