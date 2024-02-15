import { SingleSelect } from '@equinor/eds-core-react-old';
import { useQuery } from 'react-query';
import { WorkflowStepAdminAtomApi } from '../../../Atoms/workflowStepAdminAtomApi';
import { useAdminContext } from '../../../Hooks/useAdminContext';
import { adminQueries } from '../../../Queries/queries';

export const StepRejectedStatusSelect = (): JSX.Element => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);
    const { workflowStatusesQuery } = adminQueries;
    const { data: workflowStatuses } = useQuery(workflowStatusesQuery(workflowOwner));

    const { useAtomState, updateAtom } = WorkflowStepAdminAtomApi;

    const workflowStatus = useAtomState(({ rejectedStatusName }) => rejectedStatusName);

    return (
        <SingleSelect
            items={workflowStatuses?.map((x) => x.name) ?? []}
            label={'Workflow status when step is rejected'}
            meta="(Required)"
            placeholder="Select workflow status"
            value={workflowStatus}
            disabled={false}
            handleSelectedItemChange={(e) =>
                updateAtom({
                    rejectedStatusName: e.selectedItem ?? undefined,
                })
            }
        />
    );
};
