import { Atom } from '@dbeining/react-atom';
import { SidesheetApi } from '@equinor/sidesheet';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { AdminAccess } from '../Hooks/useAdminAccess';

export type AdminAtom = {
    requestAccess?: AdminAccess;
    actions?: SidesheetApi;
    app: string;
    workflowOwner: string;
    workflow: Workflow;
    workflowStep: WorkflowStepTemplate;
    status: WorkflowStatus;

    isEditingWorkflow: boolean;
    isEditingStep: boolean;
    deletingWorkflow: boolean;
    deletingStep: boolean;
    deletingStatus: boolean;
};

export const adminAtom = Atom.of<AdminAtom>({
    requestAccess: {
        canDelete: false,
        canGet: false,
        canPatch: false,
        canPost: false,
        canPut: false,
    },
    actions: {} as SidesheetApi,
    app: '',
    workflowOwner: '',
    workflow: {} as Workflow,
    workflowStep: {} as WorkflowStepTemplate,
    status: {} as WorkflowStatus,
    isEditingWorkflow: false,
    isEditingStep: false,
    deletingWorkflow: false,
    deletingStep: false,
    deletingStatus: false,
});
