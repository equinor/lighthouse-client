import { UseQueryOptions } from 'react-query';
import { getReadNotificationCardsAsync } from '../API/getReadNotifications';
import { getUnreadNotificationCardsAsync } from '../API/getUnreadNotifications';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export const notificationsBaseKey = ['Notifications'];

type Options = Pick<
  UseQueryOptions,
  'staleTime' | 'cacheTime' | 'queryFn' | 'queryKey' | 'refetchInterval'
>;

export const notificationQueries = {
  getUnreadNotificationsQuery: (client: IHttpClient): Options => ({
    queryFn: () => getUnreadNotificationCardsAsync(client),
    queryKey: [...notificationsBaseKey, 'Unread'],
    cacheTime: 5000 * 60,
    refetchInterval: 5000 * 60,
  }),
  getReadNotificationsQuery: (client: IHttpClient): Options => ({
    queryFn: () => getReadNotificationCardsAsync(client),
    queryKey: [...notificationsBaseKey, 'read'],
    cacheTime: 5000 * 60,
  }),
};
