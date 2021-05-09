export interface CategoryAnalysis{
    
    increase_entries : number, 
    increase_expenses : number, 
}

export interface Analysis{
    increase_entries : number, 
    increase_expenses : number, 
    categories : CategoryAnalysis[]
}