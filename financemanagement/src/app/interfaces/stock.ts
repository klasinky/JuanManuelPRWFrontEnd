export interface Stock {
    id?: number,
    name?: string,
    symbol?: string,
    url?: string,
}

export interface StockDetail{
    name: string,
    prices: [
        {
            date: string,
            close: string
        },
    ]
}