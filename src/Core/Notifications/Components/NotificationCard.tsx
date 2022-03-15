import { DateTime } from 'luxon';
import { useMutation, useQueryClient } from 'react-query';

import { Notification } from '../Types/Notification';
import { readNotificationAsync } from '../API/readNotification';
import { useNotificationQueryKeys } from '../Hooks/useNotificationQueryKeys';
import { useNotificationMutationKeys } from '../Hooks/useNotificationMutationKeys';
import { ClickableIcon } from '../../../components/Icon/ClickableIcon';
import {
    DetailText,
    LeftSection,
    NotificationTitle,
    RightSection,
    TimeStamp,
    Wrapper,
} from './NotificationCardStyles';
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
                    {/* TODO: resolve EDS colors */}
                    <svg
                        width={15}
                        height={15}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="6"
                            cy="6"
                            r="5.5"
                            fill={notification.seenByUser ? '#E7DEEA' : '#B276B2'}
                        />
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
                        onClick={() => {
                            window.open(
                                notification.card?.actions?.find((x) => x.type === 'Action.OpenUrl')
                                    ?.url,
                                '_blank'
                            );
                            mutateAsync({ notificationId: notification.id });
                        }}
                    >
                        <ClickableIcon name="chevron_right" />
                    </a>
                </RightSection>
            </Wrapper>
        </>
    );
};
