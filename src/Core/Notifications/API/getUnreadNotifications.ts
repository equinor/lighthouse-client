import { httpClient, isProduction } from '@equinor/portal-client';
import { NotificationList } from '../Types/NotificationList';

export async function getUnreadNotificationCardsAsync(): Promise<NotificationList> {
    const { fusion } = httpClient();
    fusion.setBaseUrl(
        `https://pro-s-notification-${isProduction() ? 'fprd' : 'ci'}.azurewebsites.net/`
    );

    const filterFromDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30).toISOString();
    //30 days from today
    const filter = `created gt ${filterFromDate} and seenByUser eq false`;

    const order = `$orderby=created%20desc`;

    return await fusion
        .fetch(`persons/me/notifications?$filter=${encodeURIComponent(filter)}&${order}`)
        .then((x) => x.json());
}
