import { openSidesheet } from '@equinor/sidesheet';
import { useQuery } from 'react-query';
import { ButtonText, Loading, NewButton } from '../../../styles/styles';
import { getWorkflowSteps, WorkflowStepTemplate } from '@equinor/Workflow';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { WorkflowStepsTable } from './WorkflowStepsTable';
import { WorkflowStepSidesheet } from '../Sidesheet/WorkflowStepSidesheet';
import { setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { useState } from 'react';
import { Modal } from '@equinor/modal';
import { EditStepModal } from '../Modal/EditStepModal';
import { CreateStepModal } from '../Modal/CreateStepModal';

export async function workflowStepsIdResolverFunction(id: string): Promise<WorkflowStepTemplate> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/workflows/workflow-available-steps/${id}`);
    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
}

const sidesheetCreator = setupWorkspaceSidesheet<WorkflowStepTemplate, 'workflowstep'>({
    id: 'workflowstep',
    color: '#0084C4',
    title: 'Edit workflow step',
    component: WorkflowStepSidesheet,
    props: {
        objectIdentifier: 'id',
        parentApp: 'admin',
        function: workflowStepsIdResolverFunction,
    },
});

export const workflowStepWidgetManifest = sidesheetCreator('SidesheetManifest');
export const workflowStepComponent = sidesheetCreator('SidesheetComponentManifest');
export const workflowStepResolverFunction = sidesheetCreator('ResolverFunction');

export async function openWorkflowStepSidesheet(step: WorkflowStepTemplate): Promise<void> {
    openSidesheet(WorkflowStepSidesheet, step, workflowStepWidgetManifest);
}

export const WorkflowSteps = (): JSX.Element | null => {
    const isEditing = useAdminContext((s) => s.isEditingStep);

    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const { data, error } = useQuery([workflowOwner], () => getWorkflowSteps({ workflowOwner }));
    if (error) {
        return (
            <Loading>
                <div>Failed to load workflow steps</div>
            </Loading>
        );
    }
    return (
        <>
            <NewButton onClick={() => setIsCreating(true)}>
                <ButtonText>Add step</ButtonText>
            </NewButton>
            <WorkflowStepsTable steps={data} />
            {isCreating && (
                <Modal
                    title={'Create workflow step'}
                    content={<CreateStepModal setIsCreating={setIsCreating} />}
                />
            )}
            {isEditing && <Modal title={'Edit workflow step'} content={<EditStepModal />} />}
        </>
    );
};
