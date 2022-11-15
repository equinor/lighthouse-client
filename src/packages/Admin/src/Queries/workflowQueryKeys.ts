interface AdminQueryKeys {
    baseKey: string[];
    adminPermissionsKey: string[];
    canVoidKey: () => string[];
    canUnVoidKey: () => string[];
}

export function adminQueryKeys(workflowId: string): AdminQueryKeys {
    const baseKey = ['workflow', workflowId];

    const adminKeys = {
        baseKey: baseKey,
        adminPermissionsKey: [...baseKey, 'permissions'],
        canVoidKey: () => [...adminKeys.adminPermissionsKey, 'canVoid'],
        canUnVoidKey: () => [...adminKeys.adminPermissionsKey, 'canUnvoid'],
    };

    return adminKeys;
}
