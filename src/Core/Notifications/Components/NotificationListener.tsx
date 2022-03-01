import { useCallback, useState } from 'react';
import { useNotificationCenter } from '../Hooks/useNotificationCenter';
import styled from 'styled-components';
import { Notification } from '../Types/Notification';
import { AdaptiveCardViewer } from './AdaptiveCardViewer';

export function NotificationListener(): JSX.Element {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const appendNotification = useCallback(
        (notification: Notification) => setNotifications([...notifications, notification]),
        []
    );

    //Callback or event emitter
    const onNotification = useCallback((notification: Notification) => {
        appendNotification(notification);
    }, []);

    useNotificationCenter(onNotification);

    return (
        <AdaptiveCardWrapper>
            {notifications &&
                notifications.map((x) => <AdaptiveCardViewer key={x.id} payload={x.card} />)}
        </AdaptiveCardWrapper>
    );
}

const AdaptiveCardWrapper = styled.div`
    display: flex;
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: white;
    border: 2px solid black;
    z-index: 1000;
`;
