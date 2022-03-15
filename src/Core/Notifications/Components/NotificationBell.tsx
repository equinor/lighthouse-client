import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';
import { useNotificationCenter } from '../Hooks/useNotificationCenter';
import { useQueryClient } from 'react-query';
import { useNotificationQueryKeys } from '../Hooks/useNotificationQueryKeys';
import { openSidesheet } from '../../../packages/Sidesheet/Functions';
import { ActionCenterSidesheet } from '../../../components/ActionCenter/ActionCenterSidesheet';

export function NotificationBell(): JSX.Element {
    const onNotification = () => queryClient.invalidateQueries(unread);

    const queryClient = useQueryClient();
    const { unreadKey: unread } = useNotificationQueryKeys();

    const notificationCenter = useNotificationCenter(onNotification);

    const connectionStatus = () =>
        notificationCenter.hubConnectionState === 'Connected'
            ? tokens.colors.interactive.primary__resting.hex
            : notificationCenter.hubConnectionState === 'Reconnecting'
                ? tokens.colors.interactive.warning__resting.hex
                : tokens.colors.infographic.primary__energy_red_100.hex;

    return (
        <>
            <Icon
                style={{ cursor: 'pointer' }}
                color={connectionStatus()}
                name={
                    notificationCenter.unreadNotificationsCount > 0
                        ? 'notifications_active'
                        : 'notifications'
                }
                onClick={() => {
                    openSidesheet(ActionCenterSidesheet);
                }}
            />
        </>
    );
}
