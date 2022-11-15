import { SingleSelect } from '@equinor/eds-core-react';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { IconMenu } from '@equinor/overlay-menu';
import {
    CompletedCriteria,
    FunctionalRole,
    Person,
    ReleaseControlStepNames,
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
    updateStepName,
    updateStepResponsible,
} from './WorkflowEditorHelpers';

interface WorkflowStepProps {
    step: WorkflowStepTemplate;
    steps: WorkflowStepTemplate[];
    functionalRoles?: FunctionalRole[];
    atomApi: any;
    app: string;
}

export const WorkflowStep = ({
    step,
    steps,
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
                                    items={Object.values(ReleaseControlStepNames)}
                                    label=""
                                    size={30}
                                    selectedOption={step.name}
                                    readOnly={true}
                                    handleSelectedItemChange={(change) =>
                                        updateAtom({
                                            workflowStepTemplates: updateStepName(
                                                step,
                                                steps,
                                                !change.selectedItem ? '' : change.selectedItem
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
                    </Selections>
                    <IconMenu items={getWorkflowStepMenuActions(step, steps, true)} />
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
                                items={Object.values(ReleaseControlStepNames)}
                                label=""
                                size={30}
                                selectedOption={step.name}
                                handleSelectedItemChange={(change) =>
                                    updateAtom({
                                        workflowStepTemplates: updateStepName(
                                            step,
                                            steps,
                                            !change.selectedItem ? '' : change.selectedItem
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
