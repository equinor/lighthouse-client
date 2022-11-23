import { useIsFetching } from 'react-query';
import { useAdminContext } from './useAdminContext';
import { adminQueryKeys } from '../Queries/adminQueryKeys';

export function useIsTemplateLoading(): boolean {
    const id = useAdminContext((x) => x.workflow.id);
    const { workflowTemplatesKey } = adminQueryKeys(id);

    const workflowFetching = useIsFetching(workflowTemplatesKey);

    return workflowFetching > 0;
}
