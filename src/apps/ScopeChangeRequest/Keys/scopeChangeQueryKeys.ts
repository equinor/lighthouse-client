/**
 * QueryKeys for scopechange queries
 * @param requestId
 */

interface WorkflowKeys {
    baseKey: string[];
    workflowPermissionsKey: (string | string[])[];
    stepKey: (stepId: string) => string[];
    canAddContributorKey: (stepId: string) => string[];
    criteriaKey: (stepId: string, criteriaId: string) => string[];
    criteriaCanSignKey: (stepId: string, criteriaId: string) => string[];
    criteriaCanReassignKey: (stepId: string, criteriaId: string) => string[];
    criteriaCanUnsignKey: (stepId: string, criteriaId: string) => string[];
    contributorKey: (stepId: string, contributionId: string) => string[];
}

interface ScopeChangeQueryKeys {
    baseKey: string[];
    historyKey: string[];
    workflowKeys: WorkflowKeys;
    requestPermissionsKey: string[];
    canVoidKey: () => string[];
    canUnVoidKey: () => string[];
}

export function scopeChangeQueryKeys(requestId: string): ScopeChangeQueryKeys {
    const baseKey = ['scopechange', requestId];
    const workflowBaseKey = [...baseKey, 'workflow'];

    const workflowKeys = {
        baseKey: workflowBaseKey,
        workflowPermissionsKey: [workflowBaseKey, 'permissions'],
        stepKey: (stepId: string) => [...workflowKeys.baseKey, 'step', stepId],
        canAddContributorKey: (stepId: string) => [
            ...workflowKeys.stepKey(stepId),
            'canAddContributor',
        ],
        criteriaKey: (stepId: string, criteriaId: string) => [
            ...workflowKeys.stepKey(stepId),
            'criteria',
            criteriaId,
        ],
        criteriaCanSignKey: (stepId: string, criteriaId: string) => [
            ...workflowKeys.criteriaKey(stepId, criteriaId),
            'canSign',
        ],
        criteriaCanReassignKey: (stepId: string, criteriaId: string) => [
            ...workflowKeys.criteriaKey(stepId, criteriaId),
            'canReassign',
        ],
        criteriaCanUnsignKey: (stepId: string, criteriaId: string) => [
            ...workflowKeys.criteriaKey(stepId, criteriaId),
            'canUnsign',
        ],
        contributorKey: (stepId: string, contributionId: string) => [
            ...workflowKeys.stepKey(stepId),
            'contributor',
            contributionId,
        ],
    };

    const scopeChangeKeys = {
        baseKey: baseKey,
        historyKey: [...baseKey, 'history'],
        workflowKeys: workflowKeys,
        requestPermissionsKey: [...baseKey, 'permissions'],
        canVoidKey: () => [...scopeChangeKeys.requestPermissionsKey, 'canVoid'],
        canUnVoidKey: () => [...scopeChangeKeys.requestPermissionsKey, 'canUnvoid'],
    };

    return scopeChangeKeys;
}
