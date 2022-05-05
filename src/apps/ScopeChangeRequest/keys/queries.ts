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
import { getCategories } from '../api/ScopeChange/getCategories';
import { getPhases } from '../api/ScopeChange/getPhases';
import { getScopeChangeById } from '../api/ScopeChange/Request';
import { getHistory } from '../api/ScopeChange/Request/getHistory';
import { CacheTime } from '../enum/cacheTimes';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';

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

export const categoryQuery: UseQueryOptions<unknown, unknown, unknown, QueryKey> = {
    queryFn: getCategories,
    queryKey: ['categories'],
    staleTime: CacheTime.TenHours,
    cacheTime: CacheTime.TenHours,
};

type QueryFunction = UseQueryOptions<unknown, unknown, unknown, QueryKey>;

interface PermissionQueries {
    canVoidQuery: (id: string) => QueryFunction;
    canUnvoidQuery: (id: string) => QueryFunction;
    permissionsQuery: (id: string) => QueryFunction;
}

interface WorkflowQueries {
    canSignQuery: (args: CriteriaArgs) => QueryFunction;
    canUnsignQuery: (args: CriteriaArgs) => QueryFunction;
    canAddContributorQuery: (requestId: string, stepId: string) => QueryFunction;
    canReassignQuery: (args: CriteriaArgs) => QueryFunction;
    canContributeQuery: (requestId: string, stepId: string, contributorId: string) => QueryFunction;
}

interface ScopeChangeQueries {
    categoryQuery: QueryFunction;
    phaseQuery: QueryFunction;
    baseQuery: (id: string) => QueryFunction;
    historyQuery: (id: string) => QueryFunction;
    permissionQueries: PermissionQueries;
    workflowQueries: WorkflowQueries;
}

export const scopeChangeQueries: ScopeChangeQueries = {
    categoryQuery: categoryQuery,
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
