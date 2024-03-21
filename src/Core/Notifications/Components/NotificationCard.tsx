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
import { StatusCircle } from './StatusCircle';

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
    <Wrapper onClick={handleClick}>
      <LeftSection>
        <StatusCircle seenByUser={notification.seenByUser} />
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
  );
};
