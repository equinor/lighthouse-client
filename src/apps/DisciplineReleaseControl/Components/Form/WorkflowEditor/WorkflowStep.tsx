import { Icon, SingleSelect } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ClickableIcon } from '@equinor/lighthouse-components';
import styled from 'styled-components';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { IconMenu } from '../../MenuButton';
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

const closeAll = () => {
    return null;
};

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
                    selectedOption={step.step}
                    handleSelectedItemChange={(change) =>
                        updateAtom({
                            steps: updateStepName(
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
                            steps: updateStepResponsible(
                                step,
                                steps,
                                !change.selectedItem ? '' : change.selectedItem
                            ),
                        })
                    }
                />
            </Selections>
            <IconMenu
                items={getWorkflowStepMenuActions(step, steps)}
                onMenuOpen={() => closeAll()}
            />
            <div style={{ marginTop: '10px' }}>
                <ClickableIcon
                    name="close"
                    onClick={() =>
                        updateAtom({
                            steps: removeStep(step, steps),
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
    width: 23px;
    height: 20px;
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
