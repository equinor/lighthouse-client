interface NotificationKeys {
    baseKey: string[];
    readKey: string[];
    unreadKey: string[];
}

/**
 * Querykeys for notifications
 */
export function useNotificationQueryKeys(): NotificationKeys {
    const baseKey = ['notifications'];

    const queryKeys = {
        baseKey: baseKey,
        readKey: [...baseKey, 'read'],
        unreadKey: [...baseKey, 'unread'],
    };

    return queryKeys;
}
