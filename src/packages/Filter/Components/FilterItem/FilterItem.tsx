import { Checkbox } from '@equinor/eds-core-react';

import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterValueType } from '../../Types/filter';
import { Count, FilterItemName, FilterItemWrap } from './FilterItem-Styles';
interface FilterItemComponentProps {
    filterItem: FilterValueType;
    groupName: string;
    count: number;
}

export const FilterItemComponent = ({
    filterItem,
    groupName,
    count,
}: FilterItemComponentProps): JSX.Element => {
    const {
        operations: { changeFilterItem },
        filterGroupState: { checkValueIsInActive, getGroupValues },
    } = useFilterApiContext();

    const isUnChecked = checkValueIsInActive(groupName, filterItem);
    const filterItemVisualName = filterItem?.toString() ?? '(Blank)';

    function uncheckAllButThisValue() {
        getGroupValues(groupName).forEach((value) =>
            changeFilterItem('MarkInactive', groupName, value, true)
        );
        changeFilterItem('MarkActive', groupName, filterItem);
    }

    if (!isUnChecked && count === 0) {
        return <></>;
    }

    return (
        <FilterItemWrap>
            <Checkbox
                title={filterItemVisualName}
                checked={!isUnChecked}
                onChange={() =>
                    changeFilterItem(
                        isUnChecked ? 'MarkActive' : 'MarkInactive',
                        groupName,
                        filterItem
                    )
                }
            />
            <FilterItemName onClick={uncheckAllButThisValue}>{filterItemVisualName}</FilterItemName>
            <Count>({isUnChecked ? null : count})</Count>
        </FilterItemWrap>
    );
};
