import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { useQuery } from 'react-query';
import { updateContext } from '../Atoms/updateContext';
import { adminQueries } from './../Queries/queries';

export function useGetWorkflow(
    app: string,
    workflowOwner: string,
    id: string,
    initialData: Workflow
): void {
    const { baseQuery } = adminQueries;
    useQuery({
        ...baseQuery(id),
        initialData: initialData,
        onSuccess: (s) => {
            updateContext({
                app: app,
                workflowOwner: workflowOwner,
                workflow: s,
                workflowStep: {} as WorkflowStepTemplate,
                status: {} as WorkflowStatus,
                isEditingWorkflow: false,
                isEditingStep: false,
                deletingWorkflow: false,
                deletingStep: false,
                deletingStatus: false,
            });
        },
    });
}
