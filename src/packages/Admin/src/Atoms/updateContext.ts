import { swap } from '@dbeining/react-atom';
import { AdminAtom, adminAtom } from './adminAtom';

export function updateContext(atom: AdminAtom): void {
    swap(adminAtom, (old) => ({
        ...old,
        app: atom.app !== '' ? atom.app : old.app,
        workflowOwner: atom.workflowOwner !== '' ? atom.workflowOwner : old.workflowOwner,
        workflow: atom.workflow.id !== undefined ? atom.workflow : old.workflow,
        workflowStep: atom.workflowStep.id !== undefined ? atom.workflowStep : old.workflowStep,
        status: atom.status.id !== undefined ? atom.status : old.status,

        isEditingWorkflow: atom.isEditingWorkflow,
        isEditingStep: atom.isEditingStep,
        deletingWorkflow: atom.deletingWorkflow,
        deletingStep: atom.deletingStep,
        deletingStatus: atom.deletingStatus,
    }));
}
