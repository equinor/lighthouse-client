import { Checkbox } from '@equinor/eds-core-react';
import { useCount } from '../../Hooks/useCount';
import { FilerItemCount, FilterItem, FilterItemCheck } from '../../Types/FilterItem';
import { debounceFilterItemCheck } from '../Utils/debounceFilterItemCheck';
import { Count, FilterItemGroupe, FilterItemLabel, FilterItemWrapper } from './FilterItem-Styles';
interface FilterItemComponentProps {
    filterItem: FilterItem;
    getCount?: FilerItemCount;
    filterItemCheck: FilterItemCheck;
    indeterminate?: boolean;
    itemKey: string;
}

export const FilterItemComponent = ({
    filterItem,
    filterItemCheck,
    indeterminate,
    itemKey,
}: FilterItemComponentProps): JSX.Element => {
    const { count, isActive } = useCount(filterItem);
    const debouncedFilterItemCheck = debounceFilterItemCheck(filterItemCheck, 0);

    if (!isActive) return <></>;
    return (
        <FilterItemWrapper key={itemKey} aria-label={filterItem.value} title={filterItem.value}>
            <FilterItemGroupe>
                <Checkbox
                    indeterminate={indeterminate}
                    title={filterItem.value}
                    checked={filterItem.checked}
                    onChange={() => {
                        debouncedFilterItemCheck(filterItem);
                    }}
                />
                <FilterItemLabel
                    onClick={() => {
                        debouncedFilterItemCheck(filterItem, true);
                    }}
                >
                    {filterItem.value}
                </FilterItemLabel>
            </FilterItemGroupe>
            <Count>({count})</Count>
        </FilterItemWrapper>
    );
};
