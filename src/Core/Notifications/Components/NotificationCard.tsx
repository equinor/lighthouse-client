import styled from 'styled-components';
import { AdaptiveCardViewer } from './AdaptiveCardViewer';
import { Notification } from '../Types/Notification';
import { DateTime } from 'luxon';
import { ClickableIcon } from './ClickableIcon';
import { useMutation, useQueryClient } from 'react-query';
import { readNotificationAsync } from '../API/readNotification';
import { useNotificationQueryKeys } from '../Hooks/useNotificationQueryKeys';
import { useNotificationMutationKeys } from '../Hooks/useNotificationMutationKeys';

export function NotificationCard(payload): JSX.Element {
    return (
        <AdaptiveCardWrapper>
            <AdaptiveCardViewer payload={payload} />
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

interface NotificationCardProps {
    notification: Notification;
}

export const NotificationCardNew = ({ notification }: NotificationCardProps): JSX.Element => {
    const queryClient = useQueryClient();
    const { baseKey } = useNotificationQueryKeys();
    const { read } = useNotificationMutationKeys();

    const { mutateAsync } = useMutation(read, readNotificationAsync, {
        onSuccess: () => queryClient.invalidateQueries(baseKey),
    });

    return (
        <Wrapper>
            <LeftSection>
                <svg
                    width={15}
                    height={15}
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="6" cy="6" r="5.5" fill={'#E7DEEA'} />
                </svg>
                <div>{notification.appKey}</div>
                <div>{notification.seenByUser.toString()}</div>
                <DetailText>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <TimeStamp>
                        {DateTime.fromJSDate(new Date(notification.created)).toRelative()}
                    </TimeStamp>
                </DetailText>
            </LeftSection>
            <RightSection>
                <a
                    onClick={() => mutateAsync({ notificationId: notification.id })}
                    href={notification.card?.actions?.find((x) => x.type === 'Action.OpenUrl')?.url}
                >
                    <ClickableIcon name="chevron_right" />
                </a>
            </RightSection>
        </Wrapper>
    );
};

const NotificationTitle = styled.div`
    font-size: 16px;
`;
const TimeStamp = styled.div`
    font-size: 10px;
`;

const RightSection = styled.div`
    display: flex;
`;

const LeftSection = styled.div`
    display: flex;
    gap: 1em;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const Wrapper = styled.div`
    display: flex;
    height: 35px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border-top: 1px #e7deea solid;
    padding: 0 0.5em;
`;

const DetailText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
