/**
 * Hook for generating mutationKeys
 * @param requestId
 * @returns
 */
export function useScopechangeMutationKeyGen(requestId: string) {
    const baseKey = ['scopechange', requestId];

    const workflowKeys = {
        baseKey: [baseKey, 'workflow'],
        stepKey: (stepId: string) => [...workflowKeys.baseKey, 'step', stepId],
        addContributorKey: (stepId: string) => [...workflowKeys.stepKey(stepId), 'addContributor'],

        criteriaKey: (stepId: string, criteriaId: string) => [
            ...workflowKeys.stepKey(stepId),
            'criteria',
            criteriaId,
        ],
        criteriaSignKey: (stepId: string, criteriaId: string) => [
            ...workflowKeys.criteriaKey(stepId, criteriaId),
            'sign',
        ],
        criteriaUnsignKey: (stepId: string, criteriaId: string) => [
            ...workflowKeys.criteriaKey(stepId, criteriaId),
            'unsign',
        ],
        criteriaReassignKey: (stepId: string, criteriaId: string) => [
            ...workflowKeys.criteriaKey(stepId, criteriaId),
            'reassign',
        ],

        contributeKey: (stepId: string, contributionId: string) => [
            ...workflowKeys.stepKey(stepId),
            'contribute',
            contributionId,
        ],
    };

    const scopeChangeKeys = {
        baseKey: baseKey,
        patchKey: () => [...scopeChangeKeys.baseKey, 'patch'],
        uploadAttachmentKey: () => [...scopeChangeKeys.baseKey, 'attachments', 'upload'],
        deleteAttachmentKey: () => [...scopeChangeKeys.baseKey, 'attachments', 'delete'],
        voidKey: () => [...scopeChangeKeys.baseKey, 'void'],
        unvoidKey: () => [...scopeChangeKeys.baseKey, 'unvoid'],
        workflowKeys: workflowKeys,
    };

    return scopeChangeKeys;
}
