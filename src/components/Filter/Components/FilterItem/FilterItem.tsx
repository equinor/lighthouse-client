import { Checkbox } from "@equinor/eds-core-react"
import { FilerItemCount, FilterItem, FilterItemCheck } from "../../Types/FilterItem"
import { FilterItemGroupe, FilterItemLabel, FilterItemWrapper } from "./FilterItem-Styles"



interface FilterItemComponentProps {
    filterItem: FilterItem;
    getCount?: FilerItemCount;
    filterItemCheck: FilterItemCheck;
    indeterminate?: boolean;
    count?: number;
    itemKey: string;
}

export const FilterItemComponent = ({ filterItem, getCount, filterItemCheck, indeterminate, count, itemKey }: FilterItemComponentProps): JSX.Element => {
    return (
        <FilterItemWrapper key={itemKey} aria-label={filterItem.value} title={filterItem.value}>
            <FilterItemGroupe>
                <Checkbox indeterminate={indeterminate} title={filterItem.value} checked={filterItem.checked} onChange={() => { filterItemCheck(filterItem) }} />
                <FilterItemLabel onClick={() => { filterItemCheck(filterItem, true) }}>
                    {filterItem.value}
                </FilterItemLabel>
            </FilterItemGroupe>
            <FilterItemGroupe>
                {getCount && getCount(filterItem.value)} {count}
            </FilterItemGroupe>
        </FilterItemWrapper>

    )
}