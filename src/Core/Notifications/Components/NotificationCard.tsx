import styled from 'styled-components';
import { DateTime } from 'luxon';
import { useMutation, useQueryClient } from 'react-query';

import { Notification } from '../Types/Notification';
import { readNotificationAsync } from '../API/readNotification';
import { useNotificationQueryKeys } from '../Hooks/useNotificationQueryKeys';
import { useNotificationMutationKeys } from '../Hooks/useNotificationMutationKeys';
import { ClickableIcon } from '../../../components/Icon/ClickableIcon';

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
        <>
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
                        href={
                            notification.card?.actions?.find((x) => x.type === 'Action.OpenUrl')
                                ?.url
                        }
                    >
                        <ClickableIcon name="chevron_right" />
                    </a>
                </RightSection>
            </Wrapper>
        </>
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
