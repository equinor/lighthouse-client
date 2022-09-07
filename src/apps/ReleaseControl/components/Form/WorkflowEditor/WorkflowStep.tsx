import { SingleSelect } from '@equinor/eds-core-react';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { IconMenu } from '@equinor/overlay-menu';
import { PCSPersonRoleSearch } from '../../../../ScopeChangeRequest/Components/PersonRoleSearch/PCSPersonRoleSearch';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { FunctionalRole } from '../../../types/functionalRole';
import {
    CreateReleaseControlStepModel,
    ReleaseControlStepNames,
    UserObject,
} from '../../../types/releaseControl';
import { CriteriaRender } from '../../Workflow/Criteria';
import { getCriteriaStatus } from '../../Workflow/Utils/getCriteriaStatus';
import { DraggableIcon } from './DraggableIcon';
import {
    CompletedCriteria,
    DraggableIconWrapper,
    HiddenDragIcon,
    Line,
    NumberCircle,
    ResponsibleSelect,
    Selections,
    StepSelect,
} from './workflow.styles';
import { DraggableHandleSelector } from './WorkflowCustomEditor';
import {
    getWorkflowStepMenuActions,
    removeStep,
    updateStepName,
    updateStepResponsible,
} from './WorkflowEditorHelpers';

interface WorkflowStepProps {
    step: CreateReleaseControlStepModel;
    steps: CreateReleaseControlStepModel[];
    functionalRoles?: FunctionalRole[];
}

export const WorkflowStep = ({ step, steps, functionalRoles }: WorkflowStepProps): JSX.Element => {
    const { updateAtom } = DRCFormAtomApi;
    return (
        <Line>
            {step.isCompleted ? (
                step.criterias !== undefined ? (
                    <CompletedCriteria>
                        <CriteriaRender
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
                        />
                    </CompletedCriteria>
                ) : null
            ) : step.name === 'Initiate' ? (
                <>
                    <HiddenDragIcon />
                    <NumberCircle>{step.order}</NumberCircle>
                    <Selections>
                        <StepSelect>
                            <SingleSelect
                                items={Object.values(ReleaseControlStepNames)}
                                label="Step"
                                size={30}
                                selectedOption={step.name}
                                readOnly={true}
                                handleSelectedItemChange={(change) =>
                                    updateAtom({
                                        workflowSteps: updateStepName(
                                            step,
                                            steps,
                                            !change.selectedItem ? '' : change.selectedItem
                                        ),
                                    })
                                }
                            />
                        </StepSelect>
                        <ResponsibleSelect>
                            <PCSPersonRoleSearch
                                onSelect={(value) => {
                                    if (!value) return;
                                    const responsibleObject = value.object as UserObject;
                                    updateAtom({
                                        workflowSteps: updateStepResponsible(
                                            step,
                                            steps,
                                            !value ? '' : value.value,
                                            responsibleObject.Email,
                                            value.type
                                        ),
                                    });
                                }}
                                classification="RELEASECONTROL"
                                value={
                                    step?.criteriaTemplates?.[0]?.type ===
                                    'RequireProcosysFunctionalRoleSignature'
                                        ? step?.criteriaTemplates?.[0]?.value
                                        : step?.criteriaTemplates?.[0]?.valueDescription
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
                    <NumberCircle>{step.order}</NumberCircle>
                    <Selections>
                        <StepSelect>
                            <SingleSelect
                                items={Object.values(ReleaseControlStepNames)}
                                label=""
                                size={30}
                                selectedOption={step.name}
                                handleSelectedItemChange={(change) =>
                                    updateAtom({
                                        workflowSteps: updateStepName(
                                            step,
                                            steps,
                                            !change.selectedItem ? '' : change.selectedItem
                                        ),
                                    })
                                }
                            />
                        </StepSelect>
                        <ResponsibleSelect>
                            <PCSPersonRoleSearch
                                onSelect={(value) => {
                                    if (!value) return;
                                    const responsibleObject = value.object as UserObject;
                                    updateAtom({
                                        workflowSteps: updateStepResponsible(
                                            step,
                                            steps,
                                            !value ? '' : value.value,
                                            responsibleObject.Email,
                                            value.type
                                        ),
                                    });
                                }}
                                classification="RELEASECONTROL"
                                value={
                                    step?.criteriaTemplates?.[0]?.type ===
                                    'RequireProcosysFunctionalRoleSignature'
                                        ? step?.criteriaTemplates?.[0]?.value
                                        : step?.criteriaTemplates?.[0]?.valueDescription
                                }
                                defaultResult={functionalRoles}
                            />
                        </ResponsibleSelect>
                    </Selections>
                    <IconMenu items={getWorkflowStepMenuActions(step, steps)} />
                    <div style={{ marginTop: '10px' }}>
                        <ClickableIcon
                            name="close"
                            onClick={() =>
                                updateAtom({
                                    workflowSteps: removeStep(step, steps),
                                })
                            }
                        />
                    </div>
                </>
            )}
        </Line>
    );
};
