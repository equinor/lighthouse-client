import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { Button, Icon, Scrim, Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useNotificationCenter } from '../Hooks/useNotificationCenter';
import { NotificationCardNew } from './NotificationCard';
import { useQueryClient } from 'react-query';
import { useNotificationQueryKeys } from '../Hooks/useNotificationQueryKeys';

export function NotificationsDrawer(): JSX.Element {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<number>(0);
    const queryClient = useQueryClient();
    const { unreadKey: unread } = useNotificationQueryKeys();

    const handleChange = (index: number) => setActiveTab(index);
    const onNotification = () => queryClient.invalidateQueries(unread);
    const notificationCenter = useNotificationCenter(onNotification);

    return (
        <>
            <Icon
                style={{ cursor: 'pointer' }}
                color={tokens.colors.interactive.primary__resting.hex}
                name={
                    notificationCenter.unreadNotificationsCount > 0
                        ? 'notifications_active'
                        : 'notifications'
                }
                onClick={() => {
                    setIsVisible(true);
                }}
            />
            {isVisible && (
                <Scrim isDismissable>
                    <Wrapper>
                        <Header>
                            <Title>Notifications</Title>
                            <Button
                                variant="ghost_icon"
                                onClick={() => {
                                    setIsVisible(false);
                                }}
                            >
                                <Icon
                                    name="close"
                                    color={tokens.colors.interactive.primary__resting.hex}
                                />
                            </Button>
                        </Header>
                        <Tabs activeTab={activeTab} onChange={handleChange}>
                            <Tabs.List>
                                <Tabs.Tab>Notifications </Tabs.Tab>
                                <Tabs.Tab>Actions </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panels>
                                <Tabs.Panel>
                                    <div>
                                        {notificationCenter.notificationCards
                                            .sort((a) => (a.seenByUser ? -1 : 1))
                                            .sort((a, b) => {
                                                const date1 = new Date(a.created).getTime();
                                                const date2 = new Date(b.created).getTime();
                                                return date2 - date1;
                                            })
                                            .map((x) => (
                                                <NotificationCardNew key={x.id} notification={x} />
                                            ))}
                                    </div>
                                </Tabs.Panel>
                                <Tabs.Panel>
                                    <div>TODO: Make some actions</div>
                                </Tabs.Panel>
                            </Tabs.Panels>
                        </Tabs>
                    </Wrapper>
                </Scrim>
            )}
        </>
    );
}

const Wrapper = styled.div`
    background-color: white;
    width: 640px;
    height: 200px;
    min-height: 800px;
    max-height: 100vh;
    overflow: scroll;
    padding: 20px;
`;

const Title = styled.h2`
    font-weight: normal;
`;

const Header = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;
