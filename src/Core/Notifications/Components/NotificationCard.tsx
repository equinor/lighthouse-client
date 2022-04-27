import { DateTime } from 'luxon';
import { useMutation, useQueryClient } from 'react-query';

import { Notification } from '../Types/Notification';
import { readNotificationAsync } from '../API/readNotification';
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
import { notificationsBaseKey } from '../queries/notificationQueries';
import { useNavigate } from 'react-router';
import { getApps } from '../../../apps/apps';
import { AppManifest } from '../../Client/Types';
import { CoreContext } from '../../WorkSpace/src/WorkSpaceApi/workspaceState';
import { deref } from '@dbeining/react-atom';
import { useLocationKey } from '../../../packages/Filter/Hooks/useLocationKey';

interface NotificationCardProps {
    notification: Notification;
    onNavigate?: () => void;
}

export const NotificationCardNew = ({
    notification,
    onNavigate,
}: NotificationCardProps): JSX.Element => {
    const queryClient = useQueryClient();
    const { read } = useNotificationMutationKeys();

    const baseKey = notificationsBaseKey;

    const { mutate: markAsRead } = useMutation(read, readNotificationAsync, {
        onSuccess: () => queryClient.invalidateQueries(baseKey),
    });

    const navigate = useNavigate();
    //HACK: Doesnt scale
    const apps = new Map<string, string>();
    apps.set('ScopeChangeControl', 'change');
    const currentLocation = useLocationKey();

    async function handleNotificationClick(appName: string, identifier: string): Promise<void> {
        const actualName = apps.get(appName);
        if (!actualName) throw 'App not found';
        const app = getApps().find(({ shortName }) => shortName === actualName);
        if (!app) throw 'Not found';
        if (currentLocation === actualName) {
            //mount sidesheet
            await openSidesheet(identifier, app);
        } else {
            //redirect
            navigate(`${app.groupe}/${app.shortName}#${app.shortName}/${identifier}`);
        }
    }

    async function openSidesheet(identifier: string, app: AppManifest) {
        const { idResolver, onSelect } = deref(CoreContext)[app.shortName];

        const item = idResolver && (await idResolver(identifier));
        if (!item) return;

        onSelect && onSelect(item);
    }

    const isExternalApp = notification.actionType === 'URL';

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
                            {DateTime.fromJSDate(new Date(notification.created)).toRelative({
                                locale: 'en-GB',
                            })}
                        </TimeStamp>
                    </DetailText>
                </LeftSection>
                <RightSection>
                    <a
                        onClick={() => {
                            isExternalApp
                                ? window.open(
                                    notification.card?.actions?.find(
                                        ({ type }) => type === 'Action.OpenUrl'
                                    )?.url,
                                    '_blank'
                                )
                                : handleNotificationClick(
                                    notification.sourceSystem.subSystem,
                                    notification.sourceSystem.identifier
                                );

                            onNavigate && onNavigate();

                            markAsRead({ notificationId: notification.id });
                        }}
                    >
                        {isExternalApp ? (
                            <ClickableIcon name="external_link" />
                        ) : (
                            <ClickableIcon name="chevron_right" />
                        )}
                    </a>
                </RightSection>
            </Wrapper>
        </>
    );
};
