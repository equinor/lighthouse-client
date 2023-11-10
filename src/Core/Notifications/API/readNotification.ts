import { httpClient } from '@equinor/lighthouse-portal-client';

interface ReadNotificationAsyncParams {
    notificationId: string;
}

export async function readNotificationAsync({
    notificationId,
}: ReadNotificationAsyncParams): Promise<void> {
    const { fusionNotifications } = httpClient();

    await fusionNotifications.fetch(`notifications/${notificationId}?api-version=1.0`, {
        method: 'PATCH',
        headers: { ['content-type']: 'application/json' },
        body: JSON.stringify({
            seenByUser: true,
        }),
    });
}
