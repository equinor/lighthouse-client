interface NotificationKeys {
    baseKey: string[];
    read: string[];
}

/**
 * Querykeys for notifications
 * @returns
 */
export function useNotificationMutationKeys(): NotificationKeys {
    const baseKey = ['notifications'];

    const queryKeys = {
        baseKey: baseKey,
        read: [...baseKey, 'read'],
    };

    return queryKeys;
}
