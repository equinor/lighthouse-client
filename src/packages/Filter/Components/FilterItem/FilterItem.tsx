import { Checkbox } from '@equinor/eds-core-react';

import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterValueType } from '../../Types/filter';
import { DEFAULT_NULL_VALUE } from '../FilterGroup/FilterGroup';
import { Count, FilterItemName, FilterItemWrap } from './FilterItem-Styles';
interface FilterItemComponentProps {
    filterItem: FilterValueType;
    groupName: string;
    count: number;
    CustomRender?: (value: FilterValueType) => JSX.Element;
}

const sanitizeFilterItemName = (value: FilterValueType) => value?.toString() ?? DEFAULT_NULL_VALUE;

export const FilterItemComponent = ({
    filterItem,
    groupName,
    count,
    CustomRender = () => <span>{sanitizeFilterItemName(filterItem)}</span>,
}: FilterItemComponentProps): JSX.Element => {
    const {
        operations: { changeFilterItem },
        filterGroupState: { checkValueIsInActive, getGroupValues },
    } = useFilterApiContext();

    const isUnChecked = checkValueIsInActive(groupName, filterItem);

    function uncheckAllButThisValue() {
        getGroupValues(groupName).forEach((value) =>
            changeFilterItem('MarkInactive', groupName, value, true)
        );
        changeFilterItem('MarkActive', groupName, filterItem);
    }

    if (!isUnChecked && count === 0) {
        return <></>;
    }

    const Custom = CustomRender(filterItem);

    return (
        <FilterItemWrap>
            <Checkbox
                checked={!isUnChecked}
                onChange={() =>
                    changeFilterItem(
                        isUnChecked ? 'MarkActive' : 'MarkInactive',
                        groupName,
                        filterItem
                    )
                }
            />
            <FilterItemName onClick={uncheckAllButThisValue}>{Custom}</FilterItemName>
            {!isUnChecked && <Count>({count})</Count>}
        </FilterItemWrap>
    );
};
