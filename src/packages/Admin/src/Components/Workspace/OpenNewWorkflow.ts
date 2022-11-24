import { getWorkflowById } from '@equinor/Workflow';
import { openWorkflowSidesheet } from './Workflows';

export async function openNewWorkflow(workflowId: string): Promise<void> {
    openWorkflowSidesheet(await getWorkflowById({ workflowId }));
}
