import { SidesheetApi } from '@equinor/sidesheet';
import { WorkflowStepTemplate } from '@equinor/Workflow';
import { FlexColumn, Wrapper } from './sidesheet.styles';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useEffect } from 'react';
import { updateContext } from '../../Atoms/updateContext';
import { useWorkflowStepSidesheetEffects } from '../../Hooks/useWorkflowStepSidesheetEffects';
import { WorkflowStepAdminAtomApi } from '../../Atoms/workflowStepAdminAtomApi';
import { StepDescriptionInput } from '../Form/Inputs/StepDescriptionInput';
import { StepCompletedStatusSelect } from '../Form/Inputs/StepCompletedStatusSelect';
import { useGetWorkflowStep } from '../../Hooks/useGetWorkflowStep';
import { useAdminMutationWatcher } from '../../Hooks/useAdminMutationWatcher';
import { WorkflowStepCreateButtonBar } from './WorkflowStepCreateButtonBar';
import { WorkflowStepSaveButtonBar } from './WorkflowStepSaveButtonBar';
import { StepRejectedStatusSelect } from '../Form/Inputs/StepRejectedStatusSelect';

interface WorkflowSidesheetProps {
    item: WorkflowStepTemplate;
    actions: SidesheetApi;
}

export function WorkflowStepSidesheet({ item, actions }: WorkflowSidesheetProps): JSX.Element {
    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    useGetWorkflowStep(app, workflowOwner, item.id, item);
    useWorkflowStepSidesheetEffects(actions, item.id);
    useAdminMutationWatcher(item.id);

    const { clearState, updateAtom } = WorkflowStepAdminAtomApi;

    useEffect(() => {
        clearState();
        updateContext(app, workflowOwner, undefined, item, undefined, false, false);
        updateAtom({
            id: item.id,
            name: item.name,
            description: item.description,
            completedStatusName: item.completedStatusName,
        });
    }, [item?.id]);

    return (
        <Wrapper>
            <div>
                <FlexColumn>
                    General info
                    <StepDescriptionInput />
                    When signed, change workflow status to:
                    <StepCompletedStatusSelect />
                    {app !== 'releasecontrol' && <StepRejectedStatusSelect />}
                </FlexColumn>
            </div>
            {item.id === '' ? (
                <WorkflowStepCreateButtonBar actions={actions} />
            ) : (
                <WorkflowStepSaveButtonBar actions={actions} />
            )}
        </Wrapper>
    );
}
