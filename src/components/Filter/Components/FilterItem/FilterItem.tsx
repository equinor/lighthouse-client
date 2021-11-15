import { Checkbox } from "@equinor/eds-core-react"
import { useCount } from "../../Hooks/useCount"
import { FilerItemCount, FilterItem, FilterItemCheck } from "../../Types/FilterItem"
import { Count, FilterItemGroupe, FilterItemLabel, FilterItemWrapper } from "./FilterItem-Styles"



interface FilterItemComponentProps {
    filterItem: FilterItem;
    getCount?: FilerItemCount;
    filterItemCheck: FilterItemCheck;
    indeterminate?: boolean;
    itemKey: string;
}

export const FilterItemComponent = ({ filterItem, filterItemCheck, indeterminate, itemKey }: FilterItemComponentProps): JSX.Element => {

    const count = useCount(filterItem);
    if (count === 0 && filterItem.checked) return (<></>)

    const debouncedFilterItemCheck = debounceFilterItemCheck(filterItemCheck, 500)

    return (
        <FilterItemWrapper key={itemKey} aria-label={filterItem.value} title={filterItem.value}>
            <FilterItemGroupe>
                <Checkbox indeterminate={indeterminate} title={filterItem.value} checked={filterItem.checked} onChange={() => { debouncedFilterItemCheck(filterItem) }} />
                <FilterItemLabel onClick={() => { debouncedFilterItemCheck(filterItem, true) }}>
                    {filterItem.value}
                </FilterItemLabel>
            </FilterItemGroupe>
            <FilterItemGroupe>
                <Count>
                    ({count})
                </Count>
            </FilterItemGroupe>
        </FilterItemWrapper>

    )

}

function debounceFilterItemCheck(filterItemCheck: FilterItemCheck, delay: number) {
    let id: NodeJS.Timeout;
    return (filterItem: FilterItem | FilterItem[], singleClick?: boolean | undefined) => {
        if (id) clearTimeout(id);
        id = setTimeout(() => {
            filterItemCheck(filterItem, singleClick)
        }, delay)
    }
}