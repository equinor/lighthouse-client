/**
 * Hook for generating mutationKeys
 * @param processId
 * @returns
 */
export function useReleaseControlMutationKeyGen(processId: string) {
    const baseKey = ['scopechange', processId];

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

    const releaseControlKeys = {
        baseKey: baseKey,
        patchKey: () => [...releaseControlKeys.baseKey, 'patch'],
        uploadAttachmentKey: () => [...releaseControlKeys.baseKey, 'attachments', 'upload'],
        deleteAttachmentKey: () => [...releaseControlKeys.baseKey, 'attachments', 'delete'],
        voidKey: () => [...releaseControlKeys.baseKey, 'void'],
        unvoidKey: () => [...releaseControlKeys.baseKey, 'unvoid'],
        workflowKeys: workflowKeys,
    };

    return releaseControlKeys;
}
