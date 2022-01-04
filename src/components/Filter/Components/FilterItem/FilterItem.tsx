import { Checkbox } from '@equinor/eds-core-react';
import { HandleFilterItemClick } from '../../Hooks/useFiltering';
import { FilterItem } from '../../Types/FilterItem';
import { Count, FilterItemGroupe, FilterItemLabel, FilterItemWrapper } from './FilterItem-Styles';

interface FilterItemComponentProps {
    filterItem: FilterItem;
    filterItemCheck: HandleFilterItemClick;
    isLoading: boolean;
}

export const FilterItemComponent = ({
    filterItem,
    filterItemCheck,
}: FilterItemComponentProps): JSX.Element => {
    if (!filterItem) return <></>;
    /**
     * Value null is an object?!
     */
    if (typeof filterItem.value === 'object' && filterItem.value !== null) {
        return <></>;
    }

    const displayName = filterItem.value !== null ? filterItem.value : '(Blank)';

    return (
        <FilterItemWrapper
            key={filterItem.value}
            aria-label={filterItem.value}
            title={filterItem.value}
        >
            <FilterItemGroupe>
                <Checkbox
                    title={displayName}
                    checked={filterItem.checked}
                    onChange={() => {
                        filterItemCheck(filterItem.filterGroupName, filterItem.value, 'box');
                    }}
                />
                <FilterItemLabel
                    onClick={() => {
                        filterItemCheck(filterItem.filterGroupName, filterItem.value, 'label');
                    }}
                >
                    {displayName}
                </FilterItemLabel>
            </FilterItemGroupe>
            <Count>{filterItem.checked && `( ${filterItem.count} )`}</Count>
        </FilterItemWrapper>
    );
};
