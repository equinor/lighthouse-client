import { Checkbox } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Count } from '../../../../../packages/Filter/Components/FilterItem/FilterItem-Styles';

import { FilterValueType } from '../../../../../packages/Filter/Types';

interface FilterItemCheckboxProps {
    filterValue: FilterValueType;
    handleFilterItemClick: () => void;
    handleFilterItemLabelClick: () => void;
    isChecked: boolean;
    ValueRender: () => JSX.Element;
    count: number;
}

export const FilterItemCheckbox = ({
    count,
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
            <Count>({count})</Count>
        </FilterItemWrap>
    );
};

const FilterLabelWrapper = styled.div`
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const FilterItemWrap = styled.div`
    grid-template-columns: auto 1fr auto;
    display: grid;
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
