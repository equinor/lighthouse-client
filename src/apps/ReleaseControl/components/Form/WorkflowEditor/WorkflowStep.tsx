import { SingleSelect } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { IconMenu } from '@equinor/overlay-menu';
import styled from 'styled-components';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { FunctionalRole } from '../../../types/functionalRole';
import { CreateReleaseControlStepModel } from '../../../types/releaseControl';
import { CriteriaRender } from '../../Workflow/Criteria';
import { getCriteriaStatus } from '../../Workflow/Utils/getCriteriaStatus';
import { DraggableIcon } from './DraggableIcon';
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
    const functionalRoleNames = functionalRoles?.map((role) => {
        return role.Code;
    });
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
            ) : (
                <>
                    <DraggableIconWrapper className={DraggableHandleSelector}>
                        <DraggableIcon></DraggableIcon>
                    </DraggableIconWrapper>
                    <NumberCircle>{step.order}</NumberCircle>
                    <Selections>
                        <SingleSelect
                            items={stepNames}
                            label="Step"
                            size={25}
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
                        <SingleSelect
                            items={functionalRoleNames ?? []}
                            label="Responsible"
                            size={30}
                            selectedOption={step?.criteriaTemplates[0]?.value}
                            handleSelectedItemChange={(change) =>
                                updateAtom({
                                    workflowSteps: updateStepResponsible(
                                        step,
                                        steps,
                                        !change.selectedItem ? '' : change.selectedItem
                                    ),
                                })
                            }
                        />
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

const DraggableIconWrapper = styled.div`
    cursor: grab;
`;

const Line = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.25em;
    align-items: center;
`;

const CompletedCriteria = styled.div`
    margin-left: 30px;
`;

const Selections = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    gap: 0.5em;
`;

const NumberCircle = styled.div`
    text-align: center;
    border: 2px solid ${tokens.colors.ui.background__medium.hex};
    border-radius: 50%;
    width: 25px;
    height: 20px;
    margin-bottom: 7px;
`;

const stepNames = [
    'Initiate',
    'Demount Insulation',
    'Electric isolation',
    'Demount HT',
    'Demount valve',
    'Mount valve',
    'Bolt tensioning',
];
