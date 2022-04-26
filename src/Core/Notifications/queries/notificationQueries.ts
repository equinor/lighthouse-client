import { UseQueryOptions } from 'react-query';
import { getReadNotificationCardsAsync } from '../API/getReadNotifications';
import { getUnreadNotificationCardsAsync } from '../API/getUnreadNotifications';

export const notificationsBaseKey = ['Notifications'];

type Options = Pick<
    UseQueryOptions,
    'staleTime' | 'cacheTime' | 'queryFn' | 'queryKey' | 'refetchInterval'
>;

export const notificationQueries = {
    getUnreadNotificationsQuery: (): Options => ({
        queryFn: getUnreadNotificationCardsAsync,
        queryKey: [...notificationsBaseKey, 'Unread'],
        cacheTime: 5000 * 60,
        refetchInterval: 5000 * 60,
    }),
    getReadNotificationsQuery: (): Options => ({
        queryFn: getReadNotificationCardsAsync,
        queryKey: [...notificationsBaseKey, 'read'],
        cacheTime: 5000 * 60,
    }),
};
