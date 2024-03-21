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

export const adminBaseKey = 'admin';

export const workflowsKey = (): string[] => [adminBaseKey, 'workflows'];

export const workflowTemplatesKey = (): string[] => [adminBaseKey, 'templates'];

export const workflowStepKey = (): string[] => [adminBaseKey, 'step'];

export const workflowStepsKey = (owner: string): string[] => [adminBaseKey, 'steps', owner];

export const workflowStatusesKey = (): string[] => [adminBaseKey, 'statuses'];

export const permissionsKey = (): string[] => [adminBaseKey, 'permissions'];

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
    queryKey: adminBaseKey,
  }),
  workflowsQuery: (workflowOwner: string) => ({
    queryFn: (): Promise<Workflow[]> => getWorkflows({ workflowOwner }),
    queryKey: workflowsKey(),
  }),
  workflowTemplatesQuery: (id: string) => ({
    queryFn: (): Promise<WorkflowTemplate[]> => getWorkflowTemplates({ workflowId: id }),
    queryKey: workflowTemplatesKey(),
  }),
  workflowStepQuery: (stepId: string) => ({
    queryFn: (): Promise<WorkflowStepTemplate> => getWorkflowStepById({ stepId }),
    queryKey: workflowStepKey(),
  }),
  workflowStepsQuery: (workflowOwner: string) => ({
    queryFn: (): Promise<WorkflowStepTemplate[]> =>
      getWorkflowSteps({ workflowOwner: workflowOwner }),
    queryKey: workflowStepsKey(workflowOwner),
  }),
  workflowStatusesQuery: (workflowOwner: string) => ({
    queryFn: (): Promise<WorkflowStatus[]> => getWorkflowStatuses(workflowOwner),
    queryKey: workflowStatusesKey(),
  }),
  permissionQueries: {
    canDeleteQuery: (id: string, app: string) => ({
      queryFn: ({ signal }) => canDelete(id, app, signal),
      queryKey: [...permissionsKey(), 'canDelete'],
    }),
    permissionsQuery: (id: string, app: string) => ({
      queryFn: ({ signal }) => getRequestAccess(id, app, signal),
      queryKey: [...permissionsKey(), 'requestAccess'],
    }),
  },
};
