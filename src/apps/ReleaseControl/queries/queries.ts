import { CacheTime, LogEntry } from '@equinor/Workflow';
import { QueryKey, UseQueryOptions } from 'react-query';
import {
  canAddContributor,
  canContribute,
  canReassign,
  canSign,
  canUnsign,
  canUnVoid,
  canVoid,
  getRequestAccess,
} from '../api/releaseControl/Access';
import { OptionRequestResult } from '../api/releaseControl/Access/optionsRequestChecker';
import { getPhases } from '../api/releaseControl/getPhases';
import { getReleaseControlById } from '../api/releaseControl/Request';
import { getHistory } from '../api/releaseControl/Request/getHistory';
import { getWorkflows } from '../api/releaseControl/Workflow/getWorkflows';
import { getWorkflowTemplate } from '../api/releaseControl/Workflow/getWorkflowTemplate';
import {
  ReleaseControl,
  ReleaseControlWorkflow,
  ReleaseControlWorkflowTemplate,
} from '../types/releaseControl';

export interface QueryContext {
  signal?: AbortSignal;
}

const releaseControlBaseKey = (requestId: string): string[] => ['releasecontrol', requestId];
const releaseControlHistoryKey = (requestId: string): string[] => [
  ...releaseControlBaseKey(requestId),
  'history',
];
const releaseControlStepKey = (requestId: string, stepId: string) => [
  ...releaseControlBaseKey(requestId),
  'step',
  stepId,
];
const criteriaKey = (requestId: string, stepId: string, criteraiId: string) => [
  ...releaseControlStepKey(requestId, stepId),
  'criteria',
  criteraiId,
];
const permissionsKey = (requestId: string) => [...releaseControlBaseKey(requestId), 'permissions'];
const phasesKey = ['phases'];
const workflowsKey = ['workflows'];

export const releaseControlWorkflowQueries: WorkflowQueries = {
  canSignQuery: ([requestId, stepId, criteriaId]: CriteriaArgs) => ({
    queryFn: ({ signal }: QueryContext) => canSign({ criteriaId, requestId, stepId }, signal),
    queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canSign'],
  }),
  canUnsignQuery: ([requestId, stepId, criteriaId]: CriteriaArgs) => ({
    queryFn: ({ signal }: QueryContext) => canUnsign({ requestId, stepId, criteriaId }, signal),
    queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canUnsign'],
  }),
  canAddContributorQuery: (requestId: string, stepId: string) => ({
    queryFn: ({ signal }: QueryContext) =>
      canAddContributor({ requestId: requestId, stepId: stepId }, signal),
    queryKey: [...releaseControlStepKey(requestId, stepId), 'canAddContributor'],
  }),
  canReassignQuery: ([requestId, stepId, criteriaId]: CriteriaArgs) => ({
    queryFn: ({ signal }: QueryContext) => canReassign({ criteriaId, requestId, stepId }, signal),
    queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canReassign'],
  }),
  canContributeQuery: (requestId: string, stepId: string, contributorId: string) => ({
    queryFn: ({ signal }: QueryContext) =>
      canContribute({ contributorId, requestId, stepId, signal }),
    queryKey: [...releaseControlStepKey(requestId, stepId), 'canContribute', contributorId],
  }),
};

type QueryFunction<Return> = UseQueryOptions<unknown, unknown, Return, QueryKey>;

interface PermissionQueries {
  canVoidQuery: (id: string) => QueryFunction<boolean>;
  canUnvoidQuery: (id: string) => QueryFunction<boolean>;
  permissionsQuery: (id: string) => QueryFunction<OptionRequestResult>;
}

interface WorkflowQueries {
  canSignQuery: (args: CriteriaArgs) => QueryFunction<boolean>;
  canUnsignQuery: (args: CriteriaArgs) => QueryFunction<boolean>;
  canAddContributorQuery: (requestId: string, stepId: string) => QueryFunction<boolean>;
  canReassignQuery: (args: CriteriaArgs) => QueryFunction<boolean>;
  canContributeQuery: (
    requestId: string,
    stepId: string,
    contributorId: string
  ) => QueryFunction<boolean>;
}

interface ReleaseControlQueries {
  phaseQuery: QueryFunction<string[]>;
  workflowsQuery: QueryFunction<ReleaseControlWorkflow[]>;
  baseQuery: (id: string) => QueryFunction<ReleaseControl>;
  workflowTemplateQuery: (id: string | null) => QueryFunction<ReleaseControlWorkflowTemplate>;
  historyQuery: (id: string) => QueryFunction<LogEntry[]>;
  permissionQueries: PermissionQueries;
  workflowQueries: WorkflowQueries;
}

export const releaseControlQueries: ReleaseControlQueries = {
  phaseQuery: {
    queryFn: getPhases,
    queryKey: phasesKey,
    staleTime: CacheTime.TenHours,
    cacheTime: CacheTime.TenHours,
  },
  workflowsQuery: {
    queryFn: getWorkflows,
    queryKey: workflowsKey,
    staleTime: CacheTime.TenHours,
    cacheTime: CacheTime.TenHours,
  },
  baseQuery: (id: string) => ({
    queryFn: ({ signal }): Promise<ReleaseControl> => getReleaseControlById(id, signal),
    queryKey: releaseControlBaseKey(id),
    staleTime: CacheTime.TenHours,
    cacheTime: CacheTime.TenHours,
  }),
  workflowTemplateQuery: (id: string | null) => ({
    queryFn: ({ signal }): Promise<ReleaseControlWorkflowTemplate | null> =>
      id ? getWorkflowTemplate(id, signal) : Promise.resolve(null),
  }),
  historyQuery: (id: string) => ({
    queryFn: ({ signal }) => getHistory(id, signal),
    queryKey: releaseControlHistoryKey(id),
    staleTime: CacheTime.FiveMinutes,
  }),
  workflowQueries: releaseControlWorkflowQueries,
  permissionQueries: {
    canVoidQuery: (id: string) => ({
      queryFn: ({ signal }) => canVoid(id, signal),
      queryKey: [...permissionsKey(id), 'canVoid'],
    }),
    canUnvoidQuery: (id: string) => ({
      queryFn: ({ signal }) => canUnVoid(id, signal),
      queryKey: [...permissionsKey(id), 'canUnvoid'],
    }),
    permissionsQuery: (id: string) => ({
      queryFn: ({ signal }) => getRequestAccess(id, signal),
      queryKey: [...permissionsKey(id), 'requestAccess'],
    }),
  },
};

type CriteriaArgs = [string, string, string];
