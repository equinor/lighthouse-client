import { WorkflowStepTemplate } from '@equinor/Workflow';
import { useQuery } from 'react-query';
import { updateContext } from '../Atoms/updateContext';
import { WorkflowStepAdminAtomApi } from '../Atoms/workflowStepAdminAtomApi';
import { adminQueries } from '../Queries/queries';

export function useGetWorkflowStep(
    app: string,
    workflowOwner: string,
    stepId: string,
    initialData: WorkflowStepTemplate
): void {
    const { workflowStepQuery } = adminQueries;
    const { updateAtom } = WorkflowStepAdminAtomApi;
    useQuery({
        ...workflowStepQuery(stepId),
        initialData: initialData,
        onSuccess: (workflowStep) => {
            updateAtom({
                id: workflowStep.id,
                name: workflowStep.name,
                description: workflowStep.description,
                completedStatusName: workflowStep.completedStatusName,
            });
            updateContext(app, workflowOwner, undefined, workflowStep, undefined, false, false);
        },
    });
}
