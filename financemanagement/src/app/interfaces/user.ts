import {Currency} from './currency';

export interface User{
    username?:string,
    name?:string,
    email?:string,
    currency?:Currency,
    last_login?:Date,
    is_active?:boolean
}