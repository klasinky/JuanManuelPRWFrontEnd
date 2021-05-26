import { User } from './user';

export interface Tag {
    id: number;
    name: string;
    color: string;
    checked?: boolean;
    image?: string;
}

export interface TagDetail{
    id: number;
    name: string;
    num_post: number;
}

export interface Post {
    id?: number,
    url?: string,
    title?: string,
    description?: string,
    finished?: boolean,
    author?: User,
    likes: number,
    url_like?: string,
    is_like: boolean,
    created_at? : Date,
    update_at? : Date,
    is_owner?: boolean
    tags: Tag[]
}