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

export const scopeChangeWorkflowQueries = {
    canSignQuery: ([requestId, stepId, criteriaId]: CriteriaArgs): OptionsQuery => ({
        queryFn: ({ signal }: QueryContext) => canSign({ criteriaId, requestId, stepId }, signal),
        queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canSign'],
    }),
    canUnsignQuery: ([requestId, stepId, criteriaId]: CriteriaArgs): OptionsQuery => ({
        queryFn: ({ signal }: QueryContext) => canUnsign({ requestId, stepId, criteriaId }, signal),
        queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canUnsign'],
    }),
    canAddContributorQuery: (requestId: string, stepId: string): OptionsQuery => ({
        queryFn: ({ signal }: QueryContext) =>
            canAddContributor({ requestId: requestId, stepId: stepId }, signal),
        queryKey: [...scopeChangeStepKey(requestId, stepId), 'canAddContributor'],
    }),
    canReassignQuery: ([requestId, stepId, criteriaId]: CriteriaArgs): OptionsQuery => ({
        queryFn: ({ signal }: QueryContext) =>
            canReassign({ criteriaId, requestId, stepId }, signal),
        queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canReassign'],
    }),
    canContributeQuery: (
        requestId: string,
        stepId: string,
        contributorId: string
    ): OptionsQuery => ({
        queryFn: ({ signal }: QueryContext) =>
            canContribute({ contributorId, requestId, stepId, signal }),
        queryKey: [...scopeChangeStepKey(requestId, stepId), 'canContribute', contributorId],
    }),
};

export const scopeChangeQueries = {
    categoryQuery: {
        queryFn: getCategories,
        queryKey: ['categories'],
    },
    phaseQuery: {
        queryFn: getPhases,
        queryKey: ['phases'],
    },
    baseQuery: (id: string) => ({
        queryFn: ({ signal }: QueryContext): Promise<ScopeChangeRequest> =>
            getScopeChangeById(id, signal),
        queryKey: scopeChangeBaseKey(id),
    }),
    historyQuery: (id: string) => ({
        queryFn: ({ signal }: QueryContext) => getHistory(id, signal),
        queryKey: scopeChangeHistoryKey(id),
    }),
    workflowQueries: scopeChangeWorkflowQueries,
    permissionQueries: {
        canVoidQuery: (id: string): OptionsQuery => ({
            queryFn: ({ signal }) => canVoid(id, signal),
            queryKey: [...permissionsKey(id), 'canVoid'],
        }),
        canUnvoidQuery: (id: string): OptionsQuery => ({
            queryFn: ({ signal }) => canUnVoid(id, signal),
            queryKey: [...permissionsKey(id), 'canUnvoid'],
        }),
        permissionsQuery: (id: string) => ({
            queryFn: ({ signal }) => getRequestAccess(id, signal),
            queryKey: [...permissionsKey(id), 'requestAccess'],
        }),
    },
};

interface OptionsQuery {
    queryFn: (args: QueryContext) => Promise<boolean>;
    queryKey: string[];
}

type CriteriaArgs = [string, string, string];
