import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const SHOW_ON_HOVER = 'add';
const HIDE_ON_HOVER = 'selected';

interface FilterTypeOptionProps {
    isSelected: boolean;
    toggleSelected: (name: string) => void;
    name: string;
}
export const FilterTypeOption = ({
    isSelected,
    name,
    toggleSelected,
}: FilterTypeOptionProps): JSX.Element => {
    return (
        <FilterTypeOptionWrapper>
            {name}

            {isSelected && (
                <Icon
                    name="check"
                    id={HIDE_ON_HOVER}
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            )}
            <ToggleButton>
                <Icon
                    onClick={() => toggleSelected(name)}
                    name={isSelected ? 'remove' : 'add_circle_filled'}
                    id={SHOW_ON_HOVER}
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            </ToggleButton>
        </FilterTypeOptionWrapper>
    );
};

const ToggleButton = styled.div`
    cursor: pointer;
`;

const FilterTypeOptionWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    height: 24px;

    &:hover {
        background-color: #f7f7f7;
    }
    #${SHOW_ON_HOVER} {
        display: none;
    }

    &:hover #${SHOW_ON_HOVER} {
        display: initial;
    }

    #${HIDE_ON_HOVER} {
        display: initial;
    }

    &:hover #${HIDE_ON_HOVER} {
        display: none;
    }
`;
