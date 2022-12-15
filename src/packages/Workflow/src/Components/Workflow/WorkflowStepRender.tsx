import { SingleSelect } from '@equinor/eds-core-react';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { IconMenu } from '@equinor/overlay-menu';
import {
    CompletedCriteria,
    CompletedStatusText,
    FunctionalRole,
    Person,
    SelectionWithTitle,
    SelectText,
    WorkflowStepTemplate,
} from '@equinor/Workflow';
import { PCSPersonRoleSearch } from '@equinor/Workflow';
import { DraggableIcon } from './DraggableIcon';
import {
    DraggableIconWrapper,
    HiddenDragIcon,
    Line,
    NumberCircle,
    NumberCircleText,
    ResponsibleSelect,
    Selections,
    StepSelect,
} from '@equinor/Workflow';
import { DraggableHandleSelector } from './WorkflowEditor';
import {
    getWorkflowStepMenuActions,
    removeStep,
    updateStep,
    updateStepResponsible,
} from './WorkflowEditorHelpers';

interface WorkflowStepProps {
    step: WorkflowStepTemplate;
    steps: WorkflowStepTemplate[];
    availableSteps: WorkflowStepTemplate[];
    functionalRoles?: FunctionalRole[];
    atomApi: any;
    app: string;
}

export const WorkflowStepRender = ({
    step,
    steps,
    availableSteps,
    functionalRoles,
    atomApi,
    app,
}: WorkflowStepProps): JSX.Element => {
    const { updateAtom } = atomApi;
    return (
        <Line>
            {step.isCompleted ? (
                step.criterias !== undefined ? (
                    <CompletedCriteria>
                        {/* <CriteriaRender
                            stepId={step.id ?? ''}
                            key={step.id}
                            contributors={[]}
                            criteria={step.criterias[0] ?? []}
                            isLastCriteria={false}
                            name={step.name}
                            order={step.order}
                            stepIndex={0}
                            stepStatus={getCriteriaStatus(step.criterias[0], false)}
                            hideOptions={true}
                            steps={steps}
                        /> */}
                    </CompletedCriteria>
                ) : null
            ) : step.name === 'Initiate' ? (
                <>
                    <HiddenDragIcon />
                    {/* Only marginTop for first NumberCircle */}
                    <NumberCircle style={{ marginTop: '16px' }}>
                        <NumberCircleText>{step.order}</NumberCircleText>
                    </NumberCircle>
                    <Selections>
                        <SelectionWithTitle>
                            <SelectText>Step</SelectText>
                            <StepSelect>
                                <SingleSelect
                                    items={availableSteps.map((x) => x.name)}
                                    label=""
                                    size={30}
                                    selectedOption={step.name}
                                    readOnly={true}
                                    handleSelectedItemChange={(change) =>
                                        updateAtom({
                                            workflowStepTemplates: updateStep(
                                                step,
                                                steps,
                                                !change.selectedItem
                                                    ? step
                                                    : availableSteps.find(
                                                          (x) => x.name === change.selectedItem
                                                      ) ?? step
                                            ),
                                        })
                                    }
                                    style={{ height: '39px' }}
                                />
                            </StepSelect>
                        </SelectionWithTitle>
                        <ResponsibleSelect>
                            <SelectText>Responsible (role)</SelectText>
                            <PCSPersonRoleSearch
                                onSelect={(value) => {
                                    if (!value) return;
                                    const responsibleObject = value.object as Person;
                                    updateAtom({
                                        workflowStepTemplates: updateStepResponsible(
                                            step,
                                            steps,
                                            !value ? '' : value.value,
                                            responsibleObject.Email,
                                            value.type
                                        ),
                                    });
                                }}
                                classification={app.toLocaleUpperCase()}
                                value={
                                    step?.workflowStepCriteriaTemplates?.[0]?.type ===
                                    'RequireProcosysFunctionalRoleSignature'
                                        ? step?.workflowStepCriteriaTemplates?.[0]?.value
                                        : step?.workflowStepCriteriaTemplates?.[0]?.valueDescription
                                }
                                defaultResult={functionalRoles}
                            />
                        </ResponsibleSelect>
                        <StepSelect>
                            <SelectText>Workflow status when step is signed</SelectText>
                            <CompletedStatusText>{step.completedStatusName}</CompletedStatusText>
                        </StepSelect>
                    </Selections>
                    <IconMenu items={getWorkflowStepMenuActions(step, steps, atomApi, true)} />
                </>
            ) : (
                <>
                    <DraggableIconWrapper className={DraggableHandleSelector}>
                        <DraggableIcon></DraggableIcon>
                    </DraggableIconWrapper>
                    <NumberCircle>
                        <NumberCircleText>{step.order}</NumberCircleText>
                    </NumberCircle>
                    <Selections>
                        <StepSelect>
                            <SingleSelect
                                items={availableSteps.map((x) => x.name)}
                                label=""
                                size={30}
                                selectedOption={step.name}
                                handleSelectedItemChange={(change) =>
                                    updateAtom({
                                        workflowStepTemplates: updateStep(
                                            step,
                                            steps,
                                            !change.selectedItem
                                                ? step
                                                : availableSteps.find(
                                                      (x) => x.name === change.selectedItem
                                                  ) ?? step
                                        ),
                                    })
                                }
                                style={{ height: '39px' }}
                            />
                        </StepSelect>
                        <ResponsibleSelect>
                            <PCSPersonRoleSearch
                                onSelect={(value) => {
                                    if (!value) return;
                                    const responsibleObject = value.object as Person;
                                    updateAtom({
                                        workflowStepTemplates: updateStepResponsible(
                                            step,
                                            steps,
                                            !value ? '' : value.value,
                                            responsibleObject.Email,
                                            value.type
                                        ),
                                    });
                                }}
                                classification={app.toLocaleUpperCase()}
                                value={
                                    step?.workflowStepCriteriaTemplates?.[0]?.type ===
                                    'RequireProcosysFunctionalRoleSignature'
                                        ? step?.workflowStepCriteriaTemplates?.[0]?.value
                                        : step?.workflowStepCriteriaTemplates?.[0]?.valueDescription
                                }
                                defaultResult={functionalRoles}
                            />
                        </ResponsibleSelect>
                        <StepSelect>
                            <CompletedStatusText>{step.completedStatusName}</CompletedStatusText>
                        </StepSelect>
                    </Selections>
                    <IconMenu items={getWorkflowStepMenuActions(step, steps, atomApi)} />
                    <div style={{ marginTop: '4px' }}>
                        <ClickableIcon
                            name="close"
                            onClick={() =>
                                updateAtom({
                                    workflowStepTemplates: removeStep(step, steps),
                                })
                            }
                        />
                    </div>
                </>
            )}
        </Line>
    );
};
