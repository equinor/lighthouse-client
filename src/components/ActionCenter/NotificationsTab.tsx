import { Accordion, Checkbox, Chip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { IconMenu } from '../../apps/ScopeChangeRequest/Components/MenuButton';
import { NotificationCardNew } from '../../Core/Notifications/Components/NotificationCard';
import { useNotificationCenter } from '../../Core/Notifications/Hooks/useNotificationCenter';
import { useNotificationQueryKeys } from '../../Core/Notifications/Hooks/useNotificationQueryKeys';
import { Notification } from '../../Core/Notifications/Types/Notification';

export function NotificationsTab(): JSX.Element {
    const { unreadKey: unread } = useNotificationQueryKeys();
    const queryClient = useQueryClient();
    const onNotification = () => queryClient.invalidateQueries(unread);
    const { unreadNotificationCards } = useNotificationCenter(onNotification);

    const origins = unreadNotificationCards
        .map(({ appName }) => appName)
        .filter((v, i, a) => a.indexOf(v) === i);

    const [activeNotifications, setActiveNotifications] = useState<string[]>(origins);

    const handleClick = (sourceSystem: string) =>
        setActiveNotifications((prev) =>
            prev.includes(sourceSystem)
                ? prev.filter((x) => x !== sourceSystem)
                : [...prev, sourceSystem]
        );

    const [isGroupedBySource, setIsGroupedBySource] = useState(true);

    const isActive = (key: string) => activeNotifications.includes(key);

    const sortAndFilterList = (list: Notification[]) =>
        list
            .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
            .filter(({ appName }) => activeNotifications.includes(appName));

    return (
        <>
            <Notifications>
                <ActiveOrigins>
                    {origins.map((x) => (
                        <Chip
                            style={{
                                backgroundColor: `${isActive(x)
                                        ? tokens.colors.interactive.primary__selected_hover.hex
                                        : tokens.colors.ui.background__medium.hex
                                    }`,
                            }}
                            onClick={() => handleClick(x)}
                            key={x}
                        >
                            {x}
                        </Chip>
                    ))}
                </ActiveOrigins>

                <IconMenu
                    iconName="filter_list"
                    items={[
                        {
                            label: `${isGroupedBySource ? 'Ungroup' : 'Group by source'} `,
                            icon: <Checkbox checked={isGroupedBySource} />,
                            onClick: () => setIsGroupedBySource((prev) => !prev),
                        },
                    ]}
                />

                {isGroupedBySource ? (
                    <Accordion>
                        {activeNotifications.map((applicationTitle) => (
                            <Accordion.Item key={applicationTitle}>
                                <Accordion.Header chevronPosition="right">
                                    {applicationTitle}
                                </Accordion.Header>
                                {sortAndFilterList(unreadNotificationCards)
                                    .filter(({ appName }) => applicationTitle === appName)
                                    .map((notification) => (
                                        <Accordion.Panel key={notification.id}>
                                            <NotificationCardNew
                                                key={notification.id}
                                                notification={notification}
                                            />
                                        </Accordion.Panel>
                                    ))}
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <NotificationsList>
                        {sortAndFilterList(unreadNotificationCards).map((x) => (
                            <NotificationCardNew key={x.id} notification={x} />
                        ))}
                    </NotificationsList>
                )}
            </Notifications>
        </>
    );
}

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
`;
