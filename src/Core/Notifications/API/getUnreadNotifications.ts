import { httpClient } from '@equinor/portal-client';
import { NotificationList } from '../Types/NotificationList';

export async function getUnreadNotificationCardsAsync(): Promise<NotificationList> {
    const { fusionNotifications } = httpClient();

    const filterFromDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30).toISOString();
    //30 days from today
    const filter = `created gt ${filterFromDate} and seenByUser eq false`;

    const order = `$orderby=created%20desc`;

    return await fusionNotifications
        .fetch(`persons/me/notifications?$filter=${encodeURIComponent(filter)}&${order}`)
        .then((x) => x.json());
}
