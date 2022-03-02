import { tokens } from '@equinor/eds-tokens';
import { useEffect, useState } from 'react';
import { Button, Icon, Scrim, Tabs } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { useNotificationCenter } from '../Hooks/useNotificationCenter';
import { NotificationCardNew } from './NotificationCard';
import { useQueryClient } from 'react-query';
import { useNotificationQueryKeys } from '../Hooks/useNotificationQueryKeys';

export function NotificationsDrawer(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<number>(0);
    const queryClient = useQueryClient();
    const { unread } = useNotificationQueryKeys();

    const handleChange = (index: number) => setActiveTab(index);
    const onNotification = () => queryClient.invalidateQueries(unread);
    const notificationCenter = useNotificationCenter(onNotification);

    useEffect(() => {
        console.log('toggling bar');
    }, [isOpen]);

    return (
        <>
            <Icon
                style={{ cursor: 'pointer' }}
                color={tokens.colors.interactive.primary__resting.hex}
                name="notifications"
                onClick={() => {
                    setIsOpen(isOpen);
                }}
            />
            {isOpen && (
                <Scrim
                    isDismissable
                    style={{
                        position: 'fixed',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        minHeight: '100vh',
                        width: '100vw',
                        zIndex: 1000,
                    }}
                >
                    <StidWrapper>
                        <StidHeader>
                            <Title>Notifications</Title>
                            <Button
                                variant="ghost_icon"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                <Icon
                                    name="close"
                                    color={tokens.colors.interactive.primary__resting.hex}
                                />
                            </Button>
                        </StidHeader>
                        <Tabs activeTab={activeTab} onChange={handleChange}>
                            <Tabs.List>
                                <Tabs.Tab>Notifications </Tabs.Tab>
                                <Tabs.Tab>Actions </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panels>
                                <Tabs.Panel>
                                    <div>
                                        {notificationCenter.notificationCards
                                            .sort((a) => (a ? -1 : 1))
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
                    </StidWrapper>
                </Scrim>
            )}
        </>
    );
}

export const IconContainer = styled.div`
    height: 24px;
    width: 24px;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
export const ResultLabel = styled.div`
    overflow: hidden;
    white-space: nowrap;
    max-width: 500px;
    font-size: 16px;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

export const ResultItem = styled.div`
    display: flex;
    align-items: center;
    width: 635px;
`;

export const StidWrapper = styled.div`
    background-color: white;
    width: 640px;
    height: 200px;
    min-height: 800px;
    max-height: 100vh;
    overflow: scroll;
    padding: 20px;
`;

export const Title = styled.h2`
    font-weight: normal;
`;

export const StidHeader = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const AdvancedSearch = styled.div`
    height: 48px;
    width: 178px;
    display: flex;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    justify-content: space-evenly;
    font-size: 14px;
    cursor: pointer;
`;
