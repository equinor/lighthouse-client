import { httpClient } from '@equinor/portal-client';

interface ReadNotificationAsyncParams {
    notificationId: string;
}

export async function readNotificationAsync({
    notificationId,
}: ReadNotificationAsyncParams): Promise<void> {
    const { customHttpClient } = httpClient({
        scope: '5a842df8-3238-415d-b168-9f16a6a6031b/.default',
    });

    await customHttpClient.fetch(
        `https://pro-s-notification-ci.azurewebsites.net/notifications/${notificationId}?api-version=1.0`,
        {
            method: 'PATCH',
            body: JSON.stringify({
                seenByUser: true,
            }),
        }
    );
}
