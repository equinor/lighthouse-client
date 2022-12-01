import { SidesheetApi } from '@equinor/sidesheet';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
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
    useWorkflowStepSidesheetEffects(actions, item);
    useAdminMutationWatcher(item.id);

    const { clearState, updateAtom } = WorkflowStepAdminAtomApi;
    useEffect(() => {
        clearState();
        updateContext({
            app: app,
            workflowOwner: workflowOwner,
            workflow: {} as Workflow,
            workflowStep: item,
            status: {} as WorkflowStatus,
            isEditingWorkflow: false,
            isEditingStep: false,
            deletingWorkflow: false,
            deletingStep: false,
            deletingStatus: false,
        });
        updateAtom({
            id: item.id,
            name: item.name,
            description: item.description,
            completedStatusName: item.completedStatusName,
        });
    }, [item?.id, item?.name]);

    const { useAtomState } = WorkflowStepAdminAtomApi;
    const description = useAtomState((s) => s.description);
    const workflowStatus = useAtomState(({ completedStatusName }) => completedStatusName);

    return (
        <Wrapper>
            <div>
                <FlexColumn>
                    General info
                    <StepDescriptionInput description={description ?? ''} />
                    When signed, change workflow status to:
                    <StepCompletedStatusSelect workflowStatus={workflowStatus ?? ''} />
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
