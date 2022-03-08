import { Notification } from './Notification';

export interface NotificationList {
    totalCount: number;
    count: number;
    nextPage: string;
    value: Notification[];
}
