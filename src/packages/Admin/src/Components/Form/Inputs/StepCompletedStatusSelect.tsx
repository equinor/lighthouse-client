import { SingleSelect } from '@equinor/eds-core-react';
import { useQuery } from 'react-query';
import { WorkflowStepAdminAtomApi } from '../../../Atoms/workflowStepAdminAtomApi';
import { useAdminContext } from '../../../Hooks/useAdminContext';
import { adminQueries } from '../../../Queries/queries';
interface StepCompletedStatusSelectProps {
    workflowStatus: string;
}

export const StepCompletedStatusSelect = ({
    workflowStatus,
}: StepCompletedStatusSelectProps): JSX.Element => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);
    const { workflowStatusesQuery } = adminQueries;
    const { data: workflowStatuses } = useQuery(workflowStatusesQuery(workflowOwner));

    const { updateAtom } = WorkflowStepAdminAtomApi;

    return (
        <SingleSelect
            items={workflowStatuses?.map((x) => x.name) ?? []}
            label={'Workflow status when step is signed'}
            meta="(Required)"
            placeholder="Select workflow status"
            value={workflowStatus}
            disabled={false}
            handleSelectedItemChange={(e) =>
                updateAtom({
                    completedStatusName: e.selectedItem ?? undefined,
                })
            }
        />
    );
};
