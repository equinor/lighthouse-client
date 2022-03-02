import { httpClient, isProduction } from '@equinor/portal-client';

interface ReadNotificationAsyncParams {
    notificationId: string;
}

export async function readNotificationAsync({
    notificationId,
}: ReadNotificationAsyncParams): Promise<void> {
    const { fusion } = httpClient();

    fusion.setBaseUrl(
        `https://pro-s-notification-${isProduction() ? 'fprd' : 'ci'}.azurewebsites.net/`
    );

    await fusion.fetch(`notifications/${notificationId}?api-version=1.0`, {
        method: 'PATCH',
        body: JSON.stringify({
            seenByUser: true,
        }),
    });
}
