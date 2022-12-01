import { swap } from '@dbeining/react-atom';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { adminAtom } from './adminAtom';

export function updateContext(
    app: string | undefined,
    workflowOwner: string | undefined,
    workflow: Workflow | undefined,
    workflowStep: WorkflowStepTemplate | undefined,
    status: WorkflowStatus | undefined,

    isEditingWorkflow: boolean,
    isEditingStep: boolean
): void {
    swap(adminAtom, (old) => ({
        ...old,
        app: app ? app : old.app,
        workflowOwner: workflowOwner ? workflowOwner : old.workflowOwner,
        workflow: workflow ? workflow : old.workflow,
        workflowStep: workflowStep ? workflowStep : old.workflowStep,
        status: status ? status : old.status,

        isEditingWorkflow: isEditingWorkflow,
        isEditingStep: isEditingStep,
    }));
}
