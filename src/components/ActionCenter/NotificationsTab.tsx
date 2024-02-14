import { Chip } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { NotificationCardNew } from '../../Core/Notifications/Components/NotificationCard';
import { useNotificationCenter } from '../../Core/Notifications/Hooks/useNotificationCenter';
import { notificationQueries } from '../../Core/Notifications/queries/notificationQueries';
import { Notification } from '../../Core/Notifications/Types/Notification';
import { getCountForAppName } from './Utils/getCountForNotificationCards';
import { useHttpClient } from '../../Core/Client/Hooks';

interface NotificationsTabProps {
    onClickNotification?: () => void;
}

export function NotificationsTab({ onClickNotification }: NotificationsTabProps): JSX.Element {
    const client = useHttpClient('fusionNotifications');
    const { getUnreadNotificationsQuery } = notificationQueries;
    const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

    const queryClient = useQueryClient();
    const onNotification = () =>
        queryClient.invalidateQueries(getUnreadNotificationsQuery(client).queryKey);
    const { unreadNotificationCards, readNotificationCards } =
        useNotificationCenter(onNotification);

    const origins = [...unreadNotificationCards, ...readNotificationCards]
        .map(({ appName = 'Unknown' }) => appName)
        .filter((v, i, a) => a.indexOf(v) === i);

    const [activeNotifications, setActiveNotifications] = useState<string[]>(origins);

    const handleClick = (sourceSystem: string) =>
        setActiveNotifications((prev) =>
            prev.includes(sourceSystem)
                ? prev.filter((x) => x !== sourceSystem)
                : [...prev, sourceSystem]
        );

    const isActive = (key: string) => activeNotifications.includes(key);

    const sortAndFilterList = (list: Notification[]) =>
        list
            .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
            .filter(({ appName }) => activeNotifications.includes(appName));

    return (
        <>
            <Notifications>
                <Header>
                    <ActiveOrigins>
                        {origins.map((applicationName, index) => (
                            <Chip
                                style={{
                                    backgroundColor: `${
                                        isActive(applicationName)
                                            ? tokens.colors.interactive.primary__selected_hover.hex
                                            : tokens.colors.ui.background__medium.hex
                                    }`,
                                }}
                                onClick={() => handleClick(applicationName)}
                                key={applicationName + index}
                            >
                                <div>{`${getCountForAppName(applicationName, [
                                    ...unreadNotificationCards,
                                    ...readNotificationCards,
                                ])} ${capitalize(applicationName)}`}</div>
                            </Chip>
                        ))}
                    </ActiveOrigins>
                </Header>

                <NotificationsList>
                    {sortAndFilterList([...unreadNotificationCards, ...readNotificationCards]).map(
                        (x, index) => (
                            <NotificationCardNew
                                key={x.id + index}
                                notification={x}
                                onNavigate={onClickNotification}
                            />
                        )
                    )}
                </NotificationsList>
            </Notifications>
        </>
    );
}

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
`;

const Notifications = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0em 1em;

    height: 100%;
`;

const ActiveOrigins = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    padding: 0em 1em;
    padding-bottom: 5px;
`;
const NotificationsList = styled.div`
    display: flex;
    flex-direction: column;
    overflow: scroll;
    padding-bottom: 2rem;
    padding-right: 1em;
    height: 100%;

    ::-webkit-scrollbar {
        height: 0.2rem;
        width: 0.3rem;
    }
    &:last-child {
        border-bottom: 1px ${tokens.colors.interactive.disabled__border.hex} solid;
    }
`;
