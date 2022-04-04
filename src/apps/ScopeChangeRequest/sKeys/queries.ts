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
import { ScopeChangeRequest } from '../sTypes/scopeChangeRequest';

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
        queryFn: () => canSign({ criteriaId, requestId, stepId }),
        queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canSign'],
    }),
    canUnsignQuery: ([requestId, stepId, criteriaId]: CriteriaArgs): OptionsQuery => ({
        queryFn: () => canUnsign({ requestId, stepId, criteriaId }),
        queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canUnsign'],
    }),
    canAddContributorQuery: (requestId: string, stepId: string): OptionsQuery => ({
        queryFn: () => canAddContributor({ requestId: requestId, stepId: stepId }),
        queryKey: [...scopeChangeStepKey(requestId, stepId), 'canAddContributor'],
    }),
    canReassignQuery: ([requestId, stepId, criteriaId]: CriteriaArgs): OptionsQuery => ({
        queryFn: () => canReassign({ criteriaId, requestId, stepId }),
        queryKey: [...criteriaKey(requestId, stepId, criteriaId), 'canReassign'],
    }),
    canContributeQuery: (
        requestId: string,
        stepId: string,
        contributorId: string
    ): OptionsQuery => ({
        queryFn: () => canContribute({ contributorId, requestId, stepId }),
        queryKey: [...scopeChangeStepKey(requestId, stepId), 'canContribute'],
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
        queryFn: (): Promise<ScopeChangeRequest> => getScopeChangeById(id),
        queryKey: scopeChangeBaseKey(id),
    }),
    historyQuery: (id: string) => ({
        queryFn: () => getHistory(id),
        queryKey: scopeChangeHistoryKey(id),
    }),
    workflowQueries: scopeChangeWorkflowQueries,
    permissionQueries: {
        canVoidQuery: (id: string): OptionsQuery => ({
            queryFn: () => canVoid(id),
            queryKey: [...permissionsKey(id), 'canVoid'],
        }),
        canUnvoidQuery: (id: string): OptionsQuery => ({
            queryFn: () => canUnVoid(id),
            queryKey: [...permissionsKey(id), 'canUnvoid'],
        }),
        permissionsQuery: (id: string) => ({
            queryFn: () => getRequestAccess(id),
            queryKey: [...permissionsKey(id), 'requestAccess'],
        }),
    },
};

interface OptionsQuery {
    queryFn: () => Promise<boolean>;
    queryKey: string[];
}

type CriteriaArgs = [string, string, string];
