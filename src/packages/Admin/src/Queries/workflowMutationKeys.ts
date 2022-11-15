interface AdminMutationKeys {
    baseKey: string[];
    patchKey: string[];
    voidKey: string[];
    unvoidKey: string[];
}

export function adminMutationKeys(workflowId: string): AdminMutationKeys {
    const baseKey = ['workflow', workflowId];

    const adminKeys = {
        baseKey: baseKey,
        patchKey: [...baseKey, 'patch'],
        voidKey: [...baseKey, 'void'],
        unvoidKey: [...baseKey, 'unvoid'],
    };

    return adminKeys;
}
