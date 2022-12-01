import { useQuery } from 'react-query';
import { WorkflowAdminAtomApi } from '../Atoms/workflowAdminAtomApi';
import { adminQueries } from '../Queries/queries';

export function useGetWorkflowTemplates(workflowId: string): void {
    const { workflowTemplatesQuery } = adminQueries;
    const { updateAtom } = WorkflowAdminAtomApi;
    useQuery({
        ...workflowTemplatesQuery(workflowId),
        onSuccess: (workflowTemplates) => {
            updateAtom({
                id: workflowTemplates ? workflowTemplates[0]?.id : '',
                workflowStepTemplates: workflowTemplates
                    ? workflowTemplates[0]?.workflowStepTemplates
                    : [],
            });
        },
    });
}
