import { httpClient, isProduction } from '@equinor/portal-client';
import { NotificationList } from '../Types/NotificationList';

export async function getReadNotificationCardsAsync(): Promise<NotificationList> {
    const { fusion } = httpClient();
    fusion.setBaseUrl(
        `https://pro-s-notification-${isProduction() ? 'fprd' : 'ci'}.azurewebsites.net/`
    );

    const filter = 'seenByUser eq true';

    const order = `$orderby=created%20desc`;

    return await fusion
        .fetch(`persons/me/notifications?$filter=${encodeURIComponent(filter)}&${order}`)
        .then((x) => x.json());
}
