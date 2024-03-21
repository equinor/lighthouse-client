interface AdminMutationKeys {
  baseKey: string[];
  postKey: string[];
  patchKey: string[];
  deleteKey: string[];
}

export function adminMutationKeys(workflowId: string): AdminMutationKeys {
  const baseKey = ['admin', workflowId];

  const adminKeys = {
    baseKey: baseKey,
    postKey: [...baseKey, 'post'],
    patchKey: [...baseKey, 'patch'],
    deleteKey: [...baseKey, 'delete'],
  };

  return adminKeys;
}
