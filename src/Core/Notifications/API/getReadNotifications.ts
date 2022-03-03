import { httpClient } from '@equinor/portal-client';
import { NotificationList } from '../Types/NotificationList';

export async function getReadNotificationCardsAsync(): Promise<NotificationList> {
    const { fusionNotifications } = httpClient();

    const filter = 'seenByUser eq true';

    const order = `$orderby=created%20desc`;

    return await fusionNotifications
        .fetch(`persons/me/notifications?$filter=${encodeURIComponent(filter)}&${order}`)
        .then((x) => x.json());
}
