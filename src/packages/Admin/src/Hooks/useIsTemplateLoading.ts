import { useIsFetching } from 'react-query';
import { adminQueryKeys } from '../Queries/adminQueryKeys';

export function useIsTemplateLoading(): boolean {
    const { workflowTemplatesKey } = adminQueryKeys();

    const workflowFetching = useIsFetching(workflowTemplatesKey);

    return workflowFetching > 0;
}
