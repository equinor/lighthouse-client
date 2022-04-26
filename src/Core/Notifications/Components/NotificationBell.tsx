import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { openSidesheet } from '@equinor/sidesheet';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { ActionCenterSidesheet } from '../../../components/ActionCenter/ActionCenterSidesheet';
import { useNotificationCenter } from '../Hooks/useNotificationCenter';
import { notificationQueries } from '../queries/notificationQueries';

export function NotificationBell(): JSX.Element {
    const { getUnreadNotificationsQuery } = notificationQueries;
    const onNotification = () =>
        queryClient.invalidateQueries(getUnreadNotificationsQuery().queryKey);

    const queryClient = useQueryClient();

    const notificationCenter = useNotificationCenter(onNotification);

    const connectionStatus = () =>
        notificationCenter.hubConnectionState === 'Connected'
            ? tokens.colors.interactive.primary__resting.hex
            : notificationCenter.hubConnectionState === 'Reconnecting'
            ? tokens.colors.interactive.warning__resting.hex
            : tokens.colors.infographic.primary__energy_red_100.hex;

    const [isOpen, setIsOpen] = useState(false);

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
                    setIsOpen(true);
                    openSidesheet(ActionCenterSidesheet);
                    // ActionCenterSidesheet
                }}
            />
            {/* {isOpen && <NotificationsSidesheet closeSidesheet={() => setIsOpen(false)} />} */}
        </>
    );
}
