import { Notification } from '../Types/Notification';
import { NotificationList } from '../Types/NotificationList';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export async function getReadNotificationCardsAsync(client: IHttpClient): Promise<Notification[]> {
  const filter = 'seenByUser eq true';

  const order = `$orderby=created%20desc`;

  const take = '$top=1000';

  const list: NotificationList = await client
    .fetch(`persons/me/notifications?$filter=${encodeURIComponent(filter)}&${order}&${take}`)
    .then((x) => x.json());

  return list.value.map((notif): Notification => {
    return {
      ...notif,
      appName: notif.appKey ? notif.appKey : notif?.sourceSystem?.subSystem ?? 'Unknown',
      actionType: notif.appKey ? 'URL' : 'Identifier',
    };
  });
}
