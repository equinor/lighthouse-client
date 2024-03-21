/**
 * QueryKeys for release control queries
 * @param releaseControlId
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

interface ReleaseControlQueryKeys {
  baseKey: string[];
  historyKey: string[];
  workflowKeys: WorkflowKeys;
  releaseControlPermissionsKey: string[];
  canVoidKey: () => string[];
  canUnVoidKey: () => string[];
}

export function releaseControlQueryKeys(releaseControlId: string): ReleaseControlQueryKeys {
  const baseKey = ['releasecontrol', releaseControlId];
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

  const releaseControlKeys = {
    baseKey: baseKey,
    historyKey: [...baseKey, 'history'],
    workflowKeys: workflowKeys,
    releaseControlPermissionsKey: [...baseKey, 'permissions'],
    canVoidKey: () => [...releaseControlKeys.releaseControlPermissionsKey, 'canVoid'],
    canUnVoidKey: () => [...releaseControlKeys.releaseControlPermissionsKey, 'canUnvoid'],
  };

  return releaseControlKeys;
}
