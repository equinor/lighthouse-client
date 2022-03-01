import { useEffect, useMemo } from 'react';
import { useSignalRHub } from './useSignalRHub';
import { httpClient, useClientContext } from '@equinor/portal-client';
import { useQuery } from 'react-query';
import { getUnReadNotificationCardsAsync } from '../API/getUnreadNotifications';
import { getReadNotificationCardsAsync } from '../API/getReadNotifications';
import { Notification } from '../Types/Notification';

interface NotificationCenter {
    notificationCards: Notification[];
    isFetchingRead: boolean;
    isFetchingUnRead: boolean;
    isEstablishingHubConnection: boolean;
}

export function useNotificationCenter(
    onNotification: (notification: Notification) => void
): NotificationCenter {
    const { fusion } = httpClient();

    const {
        internal: {
            authProvider: { getCurrentUser },
        },
    } = useClientContext();

    const { data: readNotifications, isFetching: isFetchingUnRead } = useQuery('Read', () =>
        getReadNotificationCardsAsync(getCurrentUser()?.localAccountId || '')
    );
    const { data: unreadNotifications, isFetching: isFetchingRead } = useQuery('Unread', () =>
        getUnReadNotificationCardsAsync(getCurrentUser()?.localAccountId || '')
    );

    const { hubConnection, isEstablishingHubConnection } = useSignalRHub(
        'https://pro-s-portal-ci.azurewebsites.net/signalr/hubs/notifications/?negotiateVersion=1',
        fusion.getAccessToken
    );

    useEffect(() => {
        if (hubConnection) {
            hubConnection.on('notifications', onNotification);
            return () => hubConnection.off('notifications', onNotification);
        }
    }, [hubConnection]);

    const notifications = useMemo(() => {
        return readNotifications?.value.concat(unreadNotifications?.value || []) || [];
    }, [readNotifications, unreadNotifications]);

    return {
        isFetchingRead,
        isFetchingUnRead,
        notificationCards: notifications,
        isEstablishingHubConnection,
    };
}
