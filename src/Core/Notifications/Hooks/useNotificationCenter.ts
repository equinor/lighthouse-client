import { useHttpClient } from '@equinor/lighthouse-portal-client';
import { HubConnectionState } from '@microsoft/signalr';
import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { notificationQueries } from '../queries/notificationQueries';
import { Notification } from '../Types/Notification';
import { useSignalRHub } from './useSignalRHub';
import { useFramework } from '@equinor/fusion-framework-react';

interface NotificationCenter {
  isFetchingRead: boolean;
  isFetchingUnRead: boolean;
  isEstablishingHubConnection: boolean;
  unreadNotificationsCount: number;
  unreadNotificationCards: Notification[];
  readNotificationCards: Notification[];
  hubConnectionState: ConnectionState;
}

export type ConnectionState = 'Connected' | 'Reconnecting' | 'Disconnected';
export function useNotificationCenter(
  onNotification?: (notification: Notification) => void
): NotificationCenter {
  const client = useHttpClient('fusionNotifications');
  const fusion = useHttpClient('fusion');

  const queryClient = useQueryClient();
  const [state, setState] = useState<ConnectionState>('Disconnected');

  const { getReadNotificationsQuery, getUnreadNotificationsQuery } = notificationQueries;

  const { data: readNotifications, isFetching: isFetchingRead } = useQuery<
    unknown,
    unknown,
    Notification[]
  >(getReadNotificationsQuery(client));
  const { data: unreadNotifications, isFetching: isFetchingUnRead } = useQuery<
    unknown,
    unknown,
    Notification[]
  >(getUnreadNotificationsQuery(client));

  const { hubConnection } = useSignalRHub(
    `${fusion.uri}/signalr/hubs/notifications/?negotiateVersion=1`
  );

  const onNotificationRecieved = useCallback(
    (notification: Notification) => {
      onNotification && onNotification(notification);
      queryClient.invalidateQueries(getUnreadNotificationsQuery(client).queryKey);
    },
    [getUnreadNotificationsQuery, onNotification, queryClient]
  );

  const onReconnecting = () => setState('Reconnecting');
  const onClose = () => setState('Disconnected');
  const onReconnected = () => setState('Connected');

  useEffect(() => {
    if (hubConnection) {
      hubConnection.state === HubConnectionState.Connected && setState('Connected');
      hubConnection.onclose(onClose);
      hubConnection.onreconnected(onReconnected);
      hubConnection.onreconnecting(onReconnecting);
      hubConnection.on('notifications', onNotificationRecieved);
      return () => hubConnection.off('notifications', onNotificationRecieved);
    }
  }, [hubConnection, onNotificationRecieved]);

  return {
    hubConnectionState: state,
    isFetchingRead,
    isFetchingUnRead,
    isEstablishingHubConnection: false,
    readNotificationCards: readNotifications || [],
    unreadNotificationCards: unreadNotifications || [],
    unreadNotificationsCount: unreadNotifications?.length || 0,
  };
}
