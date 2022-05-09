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
} from '../api/ScopeChange/Access';
import { OptionRequestResult } from '../api/ScopeChange/Access/optionsRequestChecker';
import { Category, getCategories } from '../api/ScopeChange/getCategories';
import { getPhases } from '../api/ScopeChange/getPhases';
import { getScopeChangeById } from '../api/ScopeChange/Request';
import { getHistory } from '../api/ScopeChange/Request/getHistory';
import { CacheTime } from '../enum/cacheTimes';
import { LogEntry, ScopeChangeRequest } from '../types/scopeChangeRequest';

export interface QueryContext {
    signal?: AbortSignal;
}

const scopeChangeBaseKey = (requestId: string): string[] => ['scopechange', requestId];
const scopeChangeHistoryKey = (requestId: string): string[] => [
    ...scopeChangeBaseKey(requestId),
    'history',
];
const scopeChangeStepKey = (requestId: string, stepId: string) => [
    ...scopeChangeBaseKey(requestId),
    'step',
    stepId,
];
const criteriaKey = (requestId: string, stepId: string, criteraiId: string) => [
    ...scopeChangeStepKey(requestId, stepId),
    'criteria',
    criteraiId,
];
const permissionsKey = (requestId: string) => [...scopeChangeBaseKey(requestId), 'permissions'];

export const scopeChangeWorkflowQueries: WorkflowQueries = {
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
        queryKey: [...scopeChangeStepKey(requestId, stepId), 'canAddContributor'],
    }),
    canReassignQuery: ([requestId, stepId, criteriaId]: CriteriaArgs) => ({
        queryFn: ({ signal }: QueryContext) =>
            canReassign({ criteriaId, requestId, stepId }, signal),
        queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canReassign'],
    }),
    canContributeQuery: (requestId: string, stepId: string, contributorId: string) => ({
        queryFn: ({ signal }: QueryContext) =>
            canContribute({ contributorId, requestId, stepId, signal }),
        queryKey: [...scopeChangeStepKey(requestId, stepId), 'canContribute', contributorId],
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

interface ScopeChangeQueries {
    categoryQuery: QueryFunction<Category[]>;
    phaseQuery: QueryFunction<string[]>;
    baseQuery: (id: string) => QueryFunction<ScopeChangeRequest>;
    historyQuery: (id: string) => QueryFunction<LogEntry[]>;
    permissionQueries: PermissionQueries;
    workflowQueries: WorkflowQueries;
}

export const scopeChangeQueries: ScopeChangeQueries = {
    categoryQuery: {
        queryFn: getCategories,
        queryKey: ['categories'],
        staleTime: CacheTime.TenHours,
        cacheTime: CacheTime.TenHours,
    },
    phaseQuery: {
        queryFn: getPhases,
        queryKey: ['phases'],
        staleTime: CacheTime.TenHours,
        cacheTime: CacheTime.TenHours,
    },
    baseQuery: (id: string) => ({
        queryFn: ({ signal }): Promise<ScopeChangeRequest> => getScopeChangeById(id, signal),
        queryKey: scopeChangeBaseKey(id),
    }),
    historyQuery: (id: string) => ({
        queryFn: ({ signal }) => getHistory(id, signal),
        queryKey: scopeChangeHistoryKey(id),
        staleTime: CacheTime.FiveMinutes,
    }),
    workflowQueries: scopeChangeWorkflowQueries,
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
