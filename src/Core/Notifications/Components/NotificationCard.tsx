import { DateTime } from 'luxon';
import { useMutation, useQueryClient } from 'react-query';
import { handleActionClick } from '../../../components/ActionCenter/handleActionClick';
import {
    DetailText,
    LeftSection,
    NotificationTitle,
    RightSection,
    TimeStamp,
    Wrapper,
} from '../../Assignments/Components/assignmentCard.styles';
import { readNotificationAsync } from '../API/readNotification';
import { useNotificationMutationKeys } from '../Hooks/useNotificationMutationKeys';
import { notificationsBaseKey } from '../queries/notificationQueries';
import { Notification } from '../Types/Notification';

interface NotificationCardProps {
    notification: Notification;
    onNavigate?: () => void;
}

export const NotificationCardNew = ({ notification }: NotificationCardProps): JSX.Element => {
    const queryClient = useQueryClient();
    const { read } = useNotificationMutationKeys();

    const baseKey = notificationsBaseKey;

    const { mutate: markAsRead } = useMutation(read, readNotificationAsync, {
        onSuccess: () => queryClient.invalidateQueries(baseKey),
    });

    const isExternalApp = notification.actionType === 'URL';

    const handleClick = () => {
        isExternalApp
            ? window.open(
                notification.card?.actions?.find(({ type }) => type === 'Action.OpenUrl')?.url,
                '_blank'
            )
            : handleActionClick(
                notification.sourceSystem.subSystem,
                notification.sourceSystem.identifier
            );

        markAsRead({ notificationId: notification?.id });
    };

    return (
        <>
            <Wrapper onClick={handleClick}>
                <LeftSection>
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
                    </DetailText>
                </LeftSection>
                <RightSection></RightSection>
                <TimeStamp>
                    {DateTime.fromJSDate(new Date(notification.created)).toRelative({
                        locale: 'en-GB',
                    })}
                </TimeStamp>
            </Wrapper>
        </>
    );
};
