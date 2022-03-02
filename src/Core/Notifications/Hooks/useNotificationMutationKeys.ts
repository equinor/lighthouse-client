interface NotificationKeys {
    baseKey: string[];
    read: string[];
}

/**
 * MutationKeys for notifications
 */
export function useNotificationMutationKeys(): NotificationKeys {
    const baseKey = ['notifications'];

    const mutationKeys = {
        baseKey: baseKey,
        read: [...baseKey, 'read'],
    };

    return mutationKeys;
}
