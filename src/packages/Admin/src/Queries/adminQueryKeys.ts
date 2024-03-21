interface AdminQueryKeys {
  baseKey: string[];
  adminPermissionsKey: string[];
  workflowsKey: string[];
  workflowTemplatesKey: string[];
  workflowStepsKey: string[];
  workflowStatusesKey: string[];
  canDeleteKey: () => string[];
}

export function adminQueryKeys(): AdminQueryKeys {
  const baseKey = ['admin'];

  const adminKeys = {
    baseKey: baseKey,
    adminPermissionsKey: [...baseKey, 'permissions'],
    workflowsKey: [...baseKey, 'workflows'],
    workflowTemplatesKey: [...baseKey, 'templates'],
    workflowStepsKey: [...baseKey, 'steps'],
    workflowStatusesKey: [...baseKey, 'statuses'],
    canDeleteKey: () => [...adminKeys.adminPermissionsKey, 'canDelete'],
  };

  return adminKeys;
}
