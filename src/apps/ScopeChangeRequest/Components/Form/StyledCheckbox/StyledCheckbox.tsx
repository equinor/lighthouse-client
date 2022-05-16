import { Checkbox } from '@equinor/eds-core-react';
import styled from 'styled-components';

interface StyledCheckboxProps {
    label?: string;
    onChange?: () => void;
    value?: boolean;
}

export const StyledCheckbox = ({ label, onChange, value }: StyledCheckboxProps): JSX.Element => {
    return (
        <CheckboxWrapper>
            <Checkbox checked={value} onChange={onChange} />
            <div>{label}</div>
        </CheckboxWrapper>
    );
};

const CheckboxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: black;
    font-weight: 500;
`;
