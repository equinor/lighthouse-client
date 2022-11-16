import { openSidesheet } from '@equinor/sidesheet';
import { useQuery } from 'react-query';
import { ButtonText, Loading, NewButton } from '../../../styles/styles';
import { getWorkflowSteps } from '@equinor/Workflow';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { SidesheetWrapper } from '../Sidesheet/SidesheetWrapper';
import { WorkflowStepsTable } from './WorkflowStepsTable';

async function openAdminSidesheet(item: string): Promise<void> {
    openSidesheet(SidesheetWrapper, item, undefined);
}

export const WorkflowSteps = (): JSX.Element | null => {
    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const { data, error } = useQuery([app, workflowOwner], () =>
        getWorkflowSteps({ app, workflowOwner })
    );
    if (error) {
        return (
            <Loading>
                <div>Failed to load workflow steps</div>
            </Loading>
        );
    }
    return (
        <>
            <NewButton onClick={() => openAdminSidesheet('new')}>
                <ButtonText>Add step</ButtonText>
            </NewButton>
            <WorkflowStepsTable steps={data} />
        </>
    );
};
