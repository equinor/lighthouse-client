import { getWorkflowStepById } from '@equinor/Workflow';
import { openWorkflowStepSidesheet } from './WorkflowSteps';

export async function openNewWorkflowStep(stepId: string): Promise<void> {
  openWorkflowStepSidesheet(await getWorkflowStepById({ stepId }));
}
