export interface Notification{
    created_at: Date, 
    id_type: number,
    notification_type: string,
    content: string,
    from_user: string,
}