import { from } from "rxjs"
import { User } from './user';
export interface Post {
    url?: string,
    title?: string,
    description?: string,
    finished?: boolean,
    author?: User,
    likes?: number,
    url_like?: string
}