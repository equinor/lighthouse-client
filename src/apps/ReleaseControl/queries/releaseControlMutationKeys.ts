interface WorkflowKeys {
    baseKey: string[];
    stepKey: (stepId: string) => string[];
    addContributorKey: (stepId: string) => string[];
    deleteContributorKey: (stepId: string) => string[];
    criteriaKey: (stepId: string, criteriaId: string) => string[];
    criteriaSignKey: (stepId: string, criteriaId: string) => string[];
    criteriaUnsignKey: (stepId: string, criteriaId: string) => string[];
    criteriaReassignKey: (stepId: string, criteriaId: string) => string[];
    contributeKey: (stepId: string, contributionId: string) => string[];
}

interface ReleaseControlMutationKeys {
    baseKey: string[];
    patchKey: string[];
    uploadAttachmentKey: string[];
    deleteAttachmentKey: string[];
    voidKey: string[];
    unvoidKey: string[];
    workflowKeys: WorkflowKeys;
}

export function releaseControlMutationKeys(requestId: string): ReleaseControlMutationKeys {
    const baseKey = ['releaseControl', requestId];

    const workflowKeys = {
        baseKey: [...baseKey, 'workflow'],
        stepKey: (stepId: string) => [...workflowKeys.baseKey, 'step', stepId],
        addContributorKey: (stepId: string) => [...workflowKeys.stepKey(stepId), 'addContributor'],
        deleteContributorKey: (stepId: string) => [
            ...workflowKeys.stepKey(stepId),
            'removeContributor',
        ],

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
        patchKey: [...baseKey, 'patch'],
        uploadAttachmentKey: [...baseKey, 'attachments', 'upload'],
        deleteAttachmentKey: [...baseKey, 'attachments', 'delete'],
        voidKey: [...baseKey, 'void'],
        unvoidKey: [...baseKey, 'unvoid'],
        workflowKeys: workflowKeys,
    };

    return releaseControlKeys;
}
