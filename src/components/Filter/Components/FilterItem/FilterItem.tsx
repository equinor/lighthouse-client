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
    isLoading,
}: FilterItemComponentProps): JSX.Element => {
    if (!filterItem) return <></>;
    if (typeof filterItem.value === 'object') {
        return <></>;
    }

    return (
        <FilterItemWrapper
            key={filterItem.value}
            aria-label={filterItem.value}
            title={filterItem.value}
        >
            <FilterItemGroupe>
                <Checkbox
                    title={filterItem.value}
                    checked={filterItem.checked}
                    // disabled={lastCheckedInGroup(filterItem.value)}
                    onChange={() => {
                        filterItemCheck(filterItem.filterGroupName, filterItem.value, 'box');
                        // if (!lastCheckedInGroup(filterItem.value)) {
                        //     filterItemCheck(filterItem, 'box');
                        // }
                    }}
                />
                <FilterItemLabel
                    onClick={() => {
                        filterItemCheck(filterItem.filterGroupName, filterItem.value, 'label');
                        // if (!lastCheckedInGroup(filterItem.value)) {
                        //     filterItemCheck(filterItem, 'label');
                        // }
                    }}
                >
                    {filterItem.value}
                </FilterItemLabel>
            </FilterItemGroupe>
            <Count>( {isLoading ? '-' : filterItem.count})</Count>
        </FilterItemWrapper>
    );
};
