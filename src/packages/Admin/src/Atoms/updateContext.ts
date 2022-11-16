import { swap } from '@dbeining/react-atom';
import { Workflow } from '@equinor/Workflow';
import { adminAtom } from './adminAtom';

export function updateContext(
    app: string,
    workflowOwner: string,
    workflow: Workflow | undefined
): void {
    swap(adminAtom, (old) => ({
        ...old,
        app: app,
        workflowOwner: workflowOwner,
        workflow: workflow ? workflow : old.workflow,
    }));
}
