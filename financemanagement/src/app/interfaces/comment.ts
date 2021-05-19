import { UserProfile } from './user';
export interface CommentPost {
    id?: number,
    description: string,
    author: UserProfile,
    parent?: number | null,
    likes?: number,
    url_like?: string,
    created_at?: Date,
    is_like?: boolean,
    is_owner?: boolean
}