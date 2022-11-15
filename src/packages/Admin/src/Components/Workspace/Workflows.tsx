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
        parentApp: undefined,
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
    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const { data, error } = useQuery([workflowOwner], () => getWorkflows({ workflowOwner }));

    if (error) {
        return (
            <Loading>
                <div>Failed to load workflows</div>
            </Loading>
        );
    }
    return (
        <>
            <NewButton
                onClick={() => openWorkflowSidesheet({ id: '', name: '', changeCategory: null })}
            >
                <ButtonText>Add template</ButtonText>
            </NewButton>
            <WorkflowsTable workflows={data ?? []} app={app} />
        </>
    );
};
