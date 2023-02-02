import { Checkbox, Tooltip } from '@equinor/eds-core-react';
import styled from 'styled-components';

interface BatchCheckboxesProps {
    isChecked: boolean;
    flipChecked: () => void;
}

export const BatchCheckbox = ({ flipChecked, isChecked }: BatchCheckboxesProps): JSX.Element => {
    return (
        <Tooltip title="Gives you a bigger search field and lets you paste a list">
            <CheckboxWrapper>
                <div>
                    <Checkbox checked={isChecked} onChange={flipChecked} />
                    Batch search
                </div>
            </CheckboxWrapper>
        </Tooltip>
    );
};

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
`;
