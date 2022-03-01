import { useEffect, useMemo } from 'react';
import { useSignalRHub } from './useSignalRHub';
import { httpClient } from '@equinor/portal-client';
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

    const { data: readNotifications, isFetching: isFetchingUnRead } = useQuery('Read', () =>
        getReadNotificationCardsAsync({ personIdentifier: 'dfeaa8de-92d2-4ee4-b171-6caba0c163bf' })
    );
    const { data: unreadNotifications, isFetching: isFetchingRead } = useQuery('Unread', () =>
        getUnReadNotificationCardsAsync({
            personIdentifier: 'dfeaa8de-92d2-4ee4-b171-6caba0c163bf',
        })
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
