import { Accordion, Checkbox, Chip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useState } from 'react';
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

    const applications = useMemo(
        () =>
            unreadNotificationCards
                .filter(({ createdByApplication }) => createdByApplication?.title !== null)
                .map((x) => x.createdByApplication?.title)
                .filter((v, i, a) => v && a.indexOf(v) === i),
        [unreadNotificationCards]
    );
    const [activeNotifications, setActiveNotifications] = useState<string[]>(applications);

    const handleClick = (application: string) =>
        setActiveNotifications((prev) =>
            prev.includes(application)
                ? prev.filter((x) => x !== application)
                : [...prev, application]
        );

    const [isGroupedBySource, setIsGroupedBySource] = useState(true);

    const isActive = (key: string) => activeNotifications.includes(key);

    const sortAndFilterList = (list: Notification[]) =>
        list
            .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
            .filter((x) => activeNotifications.includes(x.createdByApplication?.title));

    return (
        <>
            <Notifications>
                <ActiveOrigins>
                    {applications.map((x) => (
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
                                    .filter(
                                        ({ createdByApplication }) =>
                                            applicationTitle === createdByApplication?.title
                                    )
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
