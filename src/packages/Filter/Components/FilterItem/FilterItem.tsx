import { Checkbox } from '@equinor/eds-core-react';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterValueType } from '../../Types/filter';
import { Count, FilterItemGroupe, FilterItemLabel, FilterItemWrapper } from './FilterItem-Styles';
interface FilterItemComponentProps {
    filterItem: FilterValueType;
    groupName: string;
}

export const FilterItemComponent = ({
    filterItem,
    groupName,
}: FilterItemComponentProps): JSX.Element => {
    // const { count, isActive } = useCount(filterItem);
    //TODO: Implement count
    const count = 0;
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

    return (
        <FilterItemWrapper
            onClick={uncheckAllButThisValue}
            key={filterItem}
            aria-label={filterItemVisualName}
            title={filterItemVisualName}
        >
            <FilterItemGroupe>
                <Checkbox
                    title={filterItemVisualName}
                    checked={!isUnChecked}
                    onClick={(e) => {
                        e.stopPropagation();
                        changeFilterItem(
                            isUnChecked ? 'MarkActive' : 'MarkInactive',
                            groupName,
                            filterItem
                        );
                    }}
                />
                <FilterItemLabel>{filterItemVisualName}</FilterItemLabel>
            </FilterItemGroupe>
            <Count>({count})</Count>
        </FilterItemWrapper>
    );
};
