import { SidesheetApi } from '@equinor/sidesheet';
import { WorkflowAdminAtomApi } from '../../Atoms/workflowAdminAtomApi';
import {
    addStep,
    adminQueries,
    getNewWorkflowSteps,
    NewStepButton,
    SelectWorkflowTemplate,
    Workflow,
    WorkflowEditor,
    WorkflowStatus,
    WorkflowStepTemplate,
} from '@equinor/Workflow';
import {
    SelectExistingWorkflow,
    SelectionRow,
    SelectTemplateText,
    Wrapper,
} from './sidesheet.styles';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useWorkflowSidesheetEffects } from '../../Hooks/useWorkflowSidesheetEffects';
import { useAdminAccess } from '../../Hooks/useAdminAccess';
import { useGetWorkflow } from '../../Hooks/useGetWorkflow';
import { useEffect } from 'react';
import { updateContext } from '../../Atoms/updateContext';
import { useGetWorkflowTemplates } from '../../Hooks/useGetWorkflowTemplates';
import { WorkflowSaveButtonBar } from './WorkflowSaveButtonBar';
import { WorkflowCreateButtonBar } from './WorkflowCreateButtonBar';
import { useAdminMutationWatcher } from '../../Hooks/useAdminMutationWatcher';
import { useIsTemplateLoading } from '../../Hooks/useIsTemplateLoading';
import { Button, Progress } from '@equinor/eds-core-react-old';

interface WorkflowSidesheetProps {
    item: Workflow;
    actions: SidesheetApi;
}

export function WorkflowSidesheet({ item, actions }: WorkflowSidesheetProps): JSX.Element {
    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    useGetWorkflow(app, workflowOwner, item.id, item);
    useGetWorkflowTemplates(item.id);
    useWorkflowSidesheetEffects(actions, item);
    useAdminAccess(item.id);
    useAdminMutationWatcher(item.id);

    const { useAtomState, clearState, updateAtom } = WorkflowAdminAtomApi;
    const steps = useAtomState(({ workflowStepTemplates }) => workflowStepTemplates ?? []);
    const templateId = useAtomState(({ id }) => id ?? '');

    const { workflowsQuery, workflowTemplatesQuery } = adminQueries;

    const isLoading = useIsTemplateLoading();

    useEffect(() => {
        clearState();
        updateContext({
            app: app,
            workflowOwner: workflowOwner,
            workflow: item,
            workflowStep: {} as WorkflowStepTemplate,
            status: {} as WorkflowStatus,
            isEditingWorkflow: false,
            isEditingStep: false,
            deletingWorkflow: false,
            deletingStep: false,
            deletingStatus: false,
        });
    }, [item?.id]);

    return (
        <Wrapper>
            <div>
                <SelectTemplateText>
                    Select relevant workflow steps. The responsible role can stay empty, but must be
                    filled in by the user when the template is selected in an app.
                </SelectTemplateText>
                <SelectTemplateText>
                    Select a workflow template, or start by adding single steps
                </SelectTemplateText>
                {isLoading ? (
                    <Button variant="ghost_icon" disabled>
                        <Progress.Dots color="primary" />
                    </Button>
                ) : (
                    <div>
                        <SelectionRow>
                            <SelectExistingWorkflow>
                                <SelectWorkflowTemplate
                                    workflowOwner={workflowOwner}
                                    workflowsQuery={workflowsQuery}
                                    workflowTemplatesQuery={workflowTemplatesQuery}
                                    updateAtom={(data) => {
                                        if (data.length !== 0) {
                                            updateAtom({
                                                workflowStepTemplates:
                                                    (data as any)[0]?.workflowStepTemplates?.map(
                                                        (x: WorkflowStepTemplate) => {
                                                            x.criteriaTemplates =
                                                                x.workflowStepCriteriaTemplates ??
                                                                [];
                                                            return x;
                                                        }
                                                    ) ?? [],
                                            });
                                        }
                                    }}
                                />
                            </SelectExistingWorkflow>
                        </SelectionRow>
                        <WorkflowEditor
                            atomApi={WorkflowAdminAtomApi}
                            app={app}
                            workflowOwner={workflowOwner}
                        />
                        <SelectionRow>
                            {steps.length !== 0 && (
                                <NewStepButton onClick={() => addStep(steps, WorkflowAdminAtomApi)}>
                                    Add step
                                </NewStepButton>
                            )}
                            {steps.length === 0 && (
                                <NewStepButton
                                    onClick={() =>
                                        addStep(getNewWorkflowSteps(), WorkflowAdminAtomApi)
                                    }
                                >
                                    New flow
                                </NewStepButton>
                            )}
                        </SelectionRow>
                    </div>
                )}
            </div>
            {templateId === '' ? (
                <WorkflowCreateButtonBar actions={actions} />
            ) : (
                <WorkflowSaveButtonBar actions={actions} />
            )}
        </Wrapper>
    );
}
