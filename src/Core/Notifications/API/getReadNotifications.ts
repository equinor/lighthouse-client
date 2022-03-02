import { httpClient } from '@equinor/portal-client';
import { NotificationList } from '../Types/NotificationList';

export async function getReadNotificationCardsAsync(): Promise<NotificationList> {
    const { customHttpClient } = httpClient({
        scope: '5a842df8-3238-415d-b168-9f16a6a6031b/.default',
    });

    const filter = 'seenByUser eq true';

    const order = `$orderby=created%20desc`;

    return await customHttpClient
        .fetch(
            `https://pro-s-notification-ci.azurewebsites.net/persons/me/notifications?$filter=${encodeURIComponent(
                filter
            )}&${order}`
        )
        .then((x) => x.json());
}
