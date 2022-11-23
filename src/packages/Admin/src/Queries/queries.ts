import {
    canDelete,
    getRequestAccess,
    getWorkflowById,
    getWorkflows,
    getWorkflowStatuses,
    getWorkflowStepById,
    getWorkflowSteps,
    getWorkflowTemplates,
    OptionRequestResult,
    Workflow,
    WorkflowStatus,
    WorkflowStepTemplate,
    WorkflowTemplate,
} from '@equinor/Workflow';
import { QueryKey, UseQueryOptions } from 'react-query';

export interface QueryContext {
    signal?: AbortSignal;
}

const adminBaseKey = (id: string): string[] => ['admin', id];

const workflowsKey = (id: string) => [...adminBaseKey(id), 'workflows'];

const workflowTemplatesKey = (id: string) => [...adminBaseKey(id), 'templates'];

const workflowStepKey = (id: string) => [...adminBaseKey(id), 'step'];

const workflowStepsKey = (id: string) => [...adminBaseKey(id), 'steps'];

const workflowStatusesKey = (id: string) => [...adminBaseKey(id), 'statuses'];

const permissionsKey = (id: string) => [...adminBaseKey(id), 'permissions'];

type QueryFunction<Return> = UseQueryOptions<unknown, unknown, Return, QueryKey>;

interface PermissionQueries {
    canDeleteQuery: (id: string, app: string) => QueryFunction<boolean>;
    permissionsQuery: (id: string, app: string) => QueryFunction<OptionRequestResult>;
}

interface AdminQueries {
    baseQuery: (id: string) => QueryFunction<Workflow>;
    workflowsQuery: (workflowOwner: string) => QueryFunction<Workflow[]>;
    workflowTemplatesQuery: (workflowId: string) => QueryFunction<WorkflowTemplate[]>;
    workflowStepQuery: (stepId: string) => QueryFunction<WorkflowStepTemplate>;
    workflowStepsQuery: (workflowOwner: string) => QueryFunction<WorkflowStepTemplate[]>;
    workflowStatusesQuery: (workflowOwner: string) => QueryFunction<WorkflowStatus[]>;
    permissionQueries: PermissionQueries;
}

export const adminQueries: AdminQueries = {
    baseQuery: (id: string) => ({
        queryFn: (): Promise<Workflow> => getWorkflowById({ workflowId: id }),
        queryKey: adminBaseKey(id),
    }),
    workflowsQuery: (workflowOwner: string) => ({
        queryFn: (): Promise<Workflow[]> => getWorkflows({ workflowOwner }),
        queryKey: workflowsKey(''),
    }),
    workflowTemplatesQuery: (id: string) => ({
        queryFn: (): Promise<WorkflowTemplate[]> => getWorkflowTemplates({ workflowId: id }),
        queryKey: workflowTemplatesKey(id),
    }),
    workflowStepQuery: (stepId: string) => ({
        queryFn: (): Promise<WorkflowStepTemplate> => getWorkflowStepById({ stepId }),
        queryKey: workflowStepKey(''),
    }),
    workflowStepsQuery: (workflowOwner: string) => ({
        queryFn: (): Promise<WorkflowStepTemplate[]> =>
            getWorkflowSteps({ workflowOwner: workflowOwner }),
        queryKey: workflowStepsKey(''),
    }),
    workflowStatusesQuery: (workflowOwner: string) => ({
        queryFn: (): Promise<WorkflowStatus[]> => getWorkflowStatuses(workflowOwner),
        queryKey: workflowStatusesKey(''),
    }),
    permissionQueries: {
        canDeleteQuery: (id: string, app: string) => ({
            queryFn: ({ signal }) => canDelete(id, app, signal),
            queryKey: [...permissionsKey(id), 'canDelete'],
        }),
        permissionsQuery: (id: string, app: string) => ({
            queryFn: ({ signal }) => getRequestAccess(id, app, signal),
            queryKey: [...permissionsKey(id), 'requestAccess'],
        }),
    },
};
