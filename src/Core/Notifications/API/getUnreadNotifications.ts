import { httpClient } from '@equinor/lighthouse-portal-client';
import { Notification } from '../Types/Notification';
import { NotificationList } from '../Types/NotificationList';

export async function getUnreadNotificationCardsAsync(): Promise<Notification[]> {
    const { fusionNotifications } = httpClient();

    const filterFromDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30).toISOString();
    //30 days from today
    const filter = `created gt ${filterFromDate} and seenByUser eq false`;

    const order = `$orderby=created%20desc`;
    const take = '$top=1000';

    const list: NotificationList = await fusionNotifications
        .fetch(`persons/me/notifications?$filter=${encodeURIComponent(filter)}&${order}&${take}`)
        .then((x) => x.json());

    return list.value.map(
        (notif): Notification => ({
            ...notif,
            appName: notif.appKey ? notif.appKey : notif.sourceSystem.subSystem ?? 'Unknown',
            actionType: notif.appKey ? 'URL' : 'Identifier',
        })
    );
}
