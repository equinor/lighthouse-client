import { Icon, SingleSelect } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { IconMenu } from '@equinor/overlay-menu';
import styled from 'styled-components';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { DraggableHandleSelector, ReleaseControlStep } from './WorkflowCustomEditor';
import {
    getWorkflowStepMenuActions,
    removeStep,
    updateStepName,
    updateStepResponsible,
} from './WorkflowEditorHelpers';

interface WorkflowStepProps {
    step: ReleaseControlStep;
    steps: ReleaseControlStep[];
}

export const WorkflowStep = ({ step, steps }: WorkflowStepProps): JSX.Element => {
    const { updateAtom } = DRCFormAtomApi;
    return (
        <Line>
            <div className={DraggableHandleSelector}>
                <Icon
                    name="reorder"
                    color={tokens.colors.interactive.primary__resting.hex}
                    style={{ cursor: 'grab' }}
                />
            </div>
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
                    items={responsibles}
                    label="Responsible"
                    selectedOption={step.responsible}
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
        </Line>
    );
};

const Line = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.25em;
    align-items: center;
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
    'Demount Insulation',
    'Electric isolation',
    'Demount HT',
    'Demount valve',
    'Mount valve',
    'Bolt tensioning',
];

const responsibles = ['Iso', 'Electrical', 'Mechanical'];
