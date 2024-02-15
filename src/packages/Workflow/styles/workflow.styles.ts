import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Button, SingleSelect } from '@equinor/eds-core-react-old';

export const DraggableIconWrapper = styled.div`
    cursor: grab;
`;

export const Line = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.25em;
    align-items: center;
`;

export const CompletedCriteria = styled.div`
    margin-left: 30px;
`;

export const Selections = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5em;
`;

export const SelectionWithTitle = styled.div`
    display: flex;
    flex-direction: column;
`;

export const NumberCircle = styled.div`
    text-align: center;
    border: 2px solid ${tokens.colors.ui.background__medium.hex};
    border-radius: 50%;
    width: 25px;
    height: 20px;
`;

export const NumberCircleText = styled.div`
    margin-top: 5px;
`;

export const HiddenDragIcon = styled.div`
    width: 24px;
    height: 24px;
`;

export const StepSelect = styled.div`
    width: 300px;
    height: 38px;
`;

export const ResponsibleSelect = styled.div`
    height: 36px;
    width: 400px;
`;

export const CompletedStatusText = styled.div`
    font-size: 16px;
    margin-top: 12px;
    margin-left: 8px;
`;

export const SelectText = styled.div`
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: left;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
    margin-left: 8px;
`;

export const NewStepButton = styled(Button)`
    margin-bottom: 20px;
    margin-left: 8px;
    margin-top: 16px;
    width: 100px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.5em;
    padding-right: 0em;
    align-items: center;
    gap: 0.5em;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
`;

export const SingleSelectNoClear = styled(SingleSelect)`
    > div > button[title='clear'] {
        display: none;
    }
`;
