import { Checkbox } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import { FilterValueType } from '../../../../../packages/Filter/Types';

interface FilterItemCheckboxProps {
    filterValue: FilterValueType;
    handleFilterItemClick: () => void;
    handleFilterItemLabelClick: () => void;
    isChecked: boolean;
    ValueRender: () => JSX.Element;
}

export const FilterItemCheckbox = ({
    filterValue,
    handleFilterItemClick,
    isChecked,
    handleFilterItemLabelClick,
    ValueRender,
}: FilterItemCheckboxProps): JSX.Element => {
    return (
        <FilterItemWrap key={filterValue}>
            <Checkbox onChange={handleFilterItemClick} size={12} checked={!isChecked} />
            <FilterLabelWrapper onClick={handleFilterItemLabelClick}>
                <ValueRender />
            </FilterLabelWrapper>
        </FilterItemWrap>
    );
};

const FilterLabelWrapper = styled.div`
    cursor: pointer;
`;

export const FilterItemWrap = styled.div`
    grid-template-columns: auto 1fr auto;
    display: grid;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    align-items: center;
    padding-top: 2px;
    padding-bottom: 2px;
    > span {
        padding: 0px;

        > svg {
            width: 18px;
            height: 18px;
        }

        :first-child {
            padding-right: 2px;
        }
    }
    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;
