import { useQuery } from 'react-query';
import { Workflow } from '../../../Workflow/src';
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
            updateContext(app, workflowOwner, s);
        },
    });
}
