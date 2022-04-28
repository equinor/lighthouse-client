import { Accordion, Checkbox, Chip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { IconMenu } from '../../apps/ScopeChangeRequest/Components/MenuButton';
import { NotificationCardNew } from '../../Core/Notifications/Components/NotificationCard';
import { useNotificationCenter } from '../../Core/Notifications/Hooks/useNotificationCenter';
import { notificationQueries } from '../../Core/Notifications/queries/notificationQueries';
import { Notification } from '../../Core/Notifications/Types/Notification';
import { getCountForAppName } from './Utils/getCountForNotificationCards';

interface NotificationsTabProps {
    onClickNotification?: () => void;
}

export function NotificationsTab({ onClickNotification }: NotificationsTabProps): JSX.Element {
    const { getUnreadNotificationsQuery } = notificationQueries;
    const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

    const queryClient = useQueryClient();
    const onNotification = () =>
        queryClient.invalidateQueries(getUnreadNotificationsQuery().queryKey);
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

    const [isGroupedBySource, setIsGroupedBySource] = useState(false);

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
                                    backgroundColor: `${isActive(applicationName)
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

                    <IconMenu
                        iconName="filter_list"
                        items={[
                            {
                                label: `${isGroupedBySource ? 'Ungroup' : 'Group by source'} `,
                                icon: <Checkbox checked={isGroupedBySource} readOnly />,
                                onClick: () => setIsGroupedBySource((prev) => !prev),
                            },
                        ]}
                    />
                </Header>

                {isGroupedBySource ? (
                    <Accordion>
                        {activeNotifications.map((applicationTitle, index) => (
                            <Accordion.Item key={applicationTitle + index}>
                                <Accordion.Header chevronPosition="right">
                                    {capitalize(applicationTitle)}
                                </Accordion.Header>
                                {sortAndFilterList([
                                    ...unreadNotificationCards,
                                    ...readNotificationCards,
                                ])
                                    .filter(({ appName }) => applicationTitle === appName)
                                    .map((notification, index) => (
                                        <>
                                            <Accordion.Panel key={notification.id + index}>
                                                <NotificationCardNew
                                                    notification={notification}
                                                    onNavigate={onClickNotification}
                                                />
                                            </Accordion.Panel>
                                        </>
                                    ))}
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <NotificationsList>
                        {sortAndFilterList([
                            ...unreadNotificationCards,
                            ...readNotificationCards,
                        ]).map((x, index) => (
                            <NotificationCardNew
                                key={x.id + index}
                                notification={x}
                                onNavigate={onClickNotification}
                            />
                        ))}
                    </NotificationsList>
                )}
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
    gap: 1em;
    padding: 1em 0em;
`;

const ActiveOrigins = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding: 0em 1em;
`;
const NotificationsList = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 1em;
`;
