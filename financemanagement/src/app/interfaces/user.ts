import { Currency } from './currency';

export interface User {
    username?: string,
    name?: string,
    email?: string,
    currency?: Currency,
    last_login?: Date,
    is_active?: boolean
    profile_pic?: string;
}

export interface UserProfile {
    username: string,
    name: string,
    total_likes: number,
    total_followers: number
    total_following: number
    total_posts: number
    is_your_profile: boolean,
    is_follower: boolean,
    is_following: boolean,
    profile_pic?: string;

}