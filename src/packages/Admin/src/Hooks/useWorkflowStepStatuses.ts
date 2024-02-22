import { useQuery } from 'react-query';
import { useAdminContext } from '../Hooks/useAdminContext';
import { adminQueries } from '../Queries/queries';

export const useWorkflowStepStatuses = (): string[] => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);
    const { workflowStatusesQuery } = adminQueries;
    const { data: workflowStatuses } = useQuery(workflowStatusesQuery(workflowOwner));

    return workflowStatuses?.map((x) => x.name) ?? [];
};
