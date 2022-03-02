interface NotificationKeys {
    baseKey: string[];
    read: string[];
    unread: string[];
}

/**
 * Querykeys for notifications
 * @returns
 */
export function useNotificationQueryKeys(): NotificationKeys {
    const baseKey = ['notifications'];

    const queryKeys = {
        baseKey: baseKey,
        read: [...baseKey, 'read'],
        unread: [...baseKey, 'unread'],
    };

    return queryKeys;
}
