import { useDataContext } from '../../../../Core/WorkSpace/src/Context/DataProvider';

/**
 * Hook for generating queryKeys
 * @param requestId
 * @returns
 */
export function useScopechangeQueryKeyGen(requestId: string) {
    const baseKey = ['scopechange', requestId];
    const workflowBaseKey = [...baseKey, 'workflow'];
    const referencesBaseKey = [...baseKey, 'references'];

    const {
        dataApi: { queryKey },
    } = useDataContext();

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
    const referencesKeys = {
        baseKey: referencesBaseKey,
        disciplines: [...referencesBaseKey, 'disciplines'],
        systems: [...referencesBaseKey, 'systems'],
        document: (documentId: string) => [...referencesKeys.baseKey, 'document', documentId],
        area: (areaId: string) => [...referencesKeys.baseKey, 'area', areaId],
        tag: (tagId: string) => [...referencesKeys.baseKey, 'tag', tagId],
        commPkg: (commPkgId: string) => [...referencesKeys.baseKey, 'commPkg', commPkgId],
    };

    const scopeChangeKeys = {
        listKey: queryKey,
        baseKey: baseKey,
        historyKey: [...baseKey, 'history'],
        referencesKeys: referencesKeys,
        workflowKeys: workflowKeys,
        requestPermissionsKey: [...baseKey, 'permissions'],
        canVoidKey: () => [...scopeChangeKeys.requestPermissionsKey, 'canVoid'],
        canUnVoidKey: () => [...scopeChangeKeys.requestPermissionsKey, 'canUnvoid'],
    };

    return scopeChangeKeys;
}
