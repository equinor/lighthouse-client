import { SidesheetApi } from '@equinor/sidesheet';
import { WorkflowAdminAtomApi } from '../../Atoms/workflowAdminAtomApi';
import { addStep, NewStepButton, Workflow, WorkflowEditor } from '@equinor/Workflow';
import { Wrapper } from './sidesheet.styles';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useWorkflowSidesheetEffects } from '../../Hooks/useWorkflowSidesheetEffects';
import { useAdminAccess } from '../../Hooks/useAdminAccess';
import { useGetWorkflow } from '../../Hooks/useGetWorkflow';
import { useEffect } from 'react';
import { updateContext } from '../../Atoms/updateContext';
import { useGetWorkflowTemplates } from '../../Hooks/useGetWorkflowTemplates';
import { WorkflowButtonBar } from './WorkflowButtonBar';

interface WorkflowSidesheetProps {
    item: Workflow;
    actions: SidesheetApi;
}

export function WorkflowSidesheet({ item, actions }: WorkflowSidesheetProps): JSX.Element {
    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);
    useGetWorkflow(app, workflowOwner, item.id, item);
    useAdminAccess(item.id);
    useWorkflowSidesheetEffects(actions, item.id);
    useGetWorkflowTemplates(item.id);

    // useScopeChangeMutationWatcher(item.id);
    // useOctopusErrorHandler();

    // if (false) {
    //     return <></>;
    // }

    const { useAtomState, clearState } = WorkflowAdminAtomApi;
    const steps = useAtomState(({ workflowStepTemplates }) => workflowStepTemplates ?? []);

    useEffect(() => {
        clearState();
        updateContext(app, workflowOwner, item);
    }, [item?.id]);

    return (
        <Wrapper>
            <div>
                {/* <ErrorBanner clearOnPropChange={item.id} /> */}
                <WorkflowEditor atomApi={WorkflowAdminAtomApi} app={app} />
                {steps.length !== 0 && (
                    <NewStepButton onClick={() => addStep(steps, WorkflowAdminAtomApi)}>
                        Add step
                    </NewStepButton>
                )}
            </div>
            <WorkflowButtonBar actions={actions} />
        </Wrapper>
    );
}
