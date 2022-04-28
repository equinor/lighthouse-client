import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';
import { useNotificationCenter } from '../Hooks/useNotificationCenter';
import { useQueryClient } from 'react-query';
import { notificationQueries } from '../queries/notificationQueries';
import { useState } from 'react';
import { NotificationsSidesheet } from '../../../packages/Notifications sidesheet/NotificationsSidesheet';
import styled from 'styled-components';

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
            <div style={{ cursor: 'pointer' }} onClick={() => setIsOpen(true)}>
                {notificationCenter.unreadNotificationsCount > 0 ? (
                    <RedCircle>{notificationCenter.unreadNotificationsCount}</RedCircle>
                ) : (
                    <Icon
                        style={{ cursor: 'pointer' }}
                        color={connectionStatus()}
                        name={'notifications'}
                    />
                )}
            </div>

            {isOpen && <NotificationsSidesheet closeSidesheet={() => setIsOpen(false)} />}
        </>
    );
}

const RedCircle = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    color: white;
    font-size: 14px;
    background: #f15854;
`;
