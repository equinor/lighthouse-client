import { httpClient } from '@equinor/portal-client';
import { NotificationList } from '../Types/NotificationList';

export async function getUnreadNotificationCardsAsync(): Promise<NotificationList> {
    const { customHttpClient } = httpClient({
        scope: '5a842df8-3238-415d-b168-9f16a6a6031b/.default',
    });

    const filterFromDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30).toISOString();
    //30 days from today
    const filter = `created gt ${filterFromDate} and seenByUser eq false`;

    const order = `$orderby=created%20desc`;

    return await customHttpClient
        .fetch(
            `https://pro-s-notification-ci.azurewebsites.net/persons/me/notifications?$filter=${encodeURIComponent(
                filter
            )}&${order}`
        )
        .then((x) => x.json());
}
