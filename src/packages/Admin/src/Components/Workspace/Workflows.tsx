import { openSidesheet } from '@equinor/sidesheet';
import { getWorkflows } from '@equinor/Workflow';
import { useQuery } from 'react-query';
import { ButtonText, Loading, NewButton } from '../../../styles/styles';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { Workflow } from '@equinor/Workflow';
import { WorkflowSidesheet } from '../Sidesheet/WorkflowSidesheet';
import { WorkflowsTable } from './WorkflowsTable';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { Modal } from '@equinor/modal';
import { CreateWorkflowModal } from '../Modal/CreateWorkflowModal';
import { useState } from 'react';
import { EditWorkflowModal } from '../Modal/EditWorkflowModal';

export async function idResolverFunction(id: string): Promise<Workflow> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/workflows/${id}`);
    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
}

const sidesheetCreator = setupWorkspaceSidesheet<Workflow, 'workflow'>({
    id: 'workflow',
    color: '#0084C4',
    title: 'Edit workflow template',
    component: WorkflowSidesheet,
    props: {
        objectIdentifier: 'id',
        parentApp: 'admin',
        function: idResolverFunction,
    },
});

export const workflowWidgetManifest = sidesheetCreator('SidesheetManifest');
export const workflowComponent = sidesheetCreator('SidesheetComponentManifest');
export const workflowResolverFunction = sidesheetCreator('ResolverFunction');

export async function openWorkflowSidesheet(workflow: Workflow): Promise<void> {
    openSidesheet(WorkflowSidesheet, workflow, workflowWidgetManifest);
}

export const Workflows = (): JSX.Element | null => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);
    const isEditing = useAdminContext((s) => s.isEditingWorkflow);

    const { data, error, isLoading } = useQuery([workflowOwner], () =>
        getWorkflows({ workflowOwner })
    );

    const [isCreating, setIsCreating] = useState<boolean>(false);

    if (error) {
        return (
            <Loading>
                <div>Failed to load workflows</div>
            </Loading>
        );
    }

    if (isLoading) return <div>Loading</div>;
    return (
        <>
            <NewButton onClick={() => setIsCreating(true)}>
                <ButtonText>Add workflow</ButtonText>
            </NewButton>
            <WorkflowsTable workflows={data ?? []} />
            {isCreating && (
                <Modal
                    title={'Create workflow'}
                    content={<CreateWorkflowModal setIsCreating={setIsCreating} />}
                />
            )}
            {isEditing && <Modal title={'Edit workflow'} content={<EditWorkflowModal />} />}
        </>
    );
};
