import { Notification } from '../../../Core/Notifications/Types/Notification';

export const getCountForAppName = (x: string, notifications: Notification[]): number =>
    notifications.reduce((acc, { appName }) => (appName === x ? acc + 1 : acc), 0);
