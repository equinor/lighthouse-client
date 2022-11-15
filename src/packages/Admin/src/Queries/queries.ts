import {
    canUnVoid,
    canVoid,
    getRequestAccess,
    getWorkflowById,
    getWorkflowTemplates,
    OptionRequestResult,
    Workflow,
    WorkflowTemplate,
} from '@equinor/Workflow';
import { QueryKey, UseQueryOptions } from 'react-query';

export interface QueryContext {
    signal?: AbortSignal;
}

const adminBaseKey = (id: string): string[] => ['admin', id];

const workflowTemplatesKey = (id: string) => [...adminBaseKey(id), 'templates'];

const permissionsKey = (id: string) => [...adminBaseKey(id), 'permissions'];

type QueryFunction<Return> = UseQueryOptions<unknown, unknown, Return, QueryKey>;

interface PermissionQueries {
    canVoidQuery: (id: string, app: string) => QueryFunction<boolean>;
    canUnvoidQuery: (id: string, app: string) => QueryFunction<boolean>;
    permissionsQuery: (id: string, app: string) => QueryFunction<OptionRequestResult>;
}

interface AdminQueries {
    baseQuery: (id: string) => QueryFunction<Workflow>;
    workflowTemplatesQuery: (workflowId: string) => QueryFunction<WorkflowTemplate[]>;
    permissionQueries: PermissionQueries;
}

export const adminQueries: AdminQueries = {
    baseQuery: (id: string) => ({
        queryFn: (): Promise<Workflow> => getWorkflowById({ workflowId: id }),
        queryKey: adminBaseKey(id),
    }),
    workflowTemplatesQuery: (id: string) => ({
        queryFn: (): Promise<WorkflowTemplate[]> => getWorkflowTemplates({ workflowId: id }),
        queryKey: workflowTemplatesKey(id),
    }),
    permissionQueries: {
        canVoidQuery: (id: string, app: string) => ({
            queryFn: ({ signal }) => canVoid(id, app, signal),
            queryKey: [...permissionsKey(id), 'canVoid'],
        }),
        canUnvoidQuery: (id: string, app: string) => ({
            queryFn: ({ signal }) => canUnVoid(id, app, signal),
            queryKey: [...permissionsKey(id), 'canUnvoid'],
        }),
        permissionsQuery: (id: string, app: string) => ({
            queryFn: ({ signal }) => getRequestAccess(id, app, signal),
            queryKey: [...permissionsKey(id), 'requestAccess'],
        }),
    },
};
