import { Checkbox, Search } from "@equinor/eds-core-react"
import React, { useMemo, useState } from "react"
import { FilterGroup, FilterItemCheck } from "../../Types/FilterItem"
import { FilterItemComponent } from "../FilterItem/FilterItem"
import { FilterGroupWrapper, FilterItemWrapper, Title, Wrapper } from "./FilterGroup-Styles"


interface FilterGroupeComponentProps {
    filterGroup: FilterGroup,
    filterItemCheck: FilterItemCheck,
}

function searchByValue(items: string[], value: string) {
    return items.filter(item => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
}

function allChecked(filterGroup: FilterGroup): boolean {
    return checkedCount(filterGroup) === Object.keys(filterGroup.value).length;
}

function checkedCount(filterGroup: FilterGroup): number {
    return Object.keys(filterGroup.value).filter(key => filterGroup.value[key].checked).length;
}

function checkIsIndeterminate(filterGroup: FilterGroup) {
    const maxCount = Object.keys(filterGroup.value).length;
    const count = checkedCount(filterGroup)
    return count > 0 && count < maxCount;
}

export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({ filterGroup, filterItemCheck }: FilterGroupeComponentProps) => {
    const [filterSearchValue, setFilterSearchValue] = useState("");
    const group = useMemo(() => searchByValue(Object.keys(filterGroup.value), filterSearchValue), [filterSearchValue, filterGroup]);


    function handleOnChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const value = event.target.value
        setFilterSearchValue(value)
    }
    function handleOnKeyPress(
        event: React.KeyboardEvent<HTMLInputElement>,
    ) {
        if (event.code === "Enter") {
            const filterItems = group.map(key => filterGroup.value[key])
            filterItemCheck(filterItems, true)
            setFilterSearchValue("");
        }
    }

    function handleOnAllChange() {
        filterItemCheck(Object.keys(filterGroup.value).map(key => filterGroup.value[key]), true)
    }

    const isAllChecked = allChecked(filterGroup);
    const isIndeterminate = checkIsIndeterminate(filterGroup)

    return (
        <Wrapper>
            <Title>{filterGroup.type}</Title>
            <Search
                aria-label="in filer group"
                id="search-normal"
                placeholder="Search"
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
            />
            <FilterGroupWrapper>
                <FilterItemWrapper>
                    <Checkbox title={"All"} label={"All"} checked={isAllChecked} indeterminate={isIndeterminate} onChange={handleOnAllChange} />
                    {

                        group.map((key) => {
                            const item = filterGroup.value[key];
                            return (
                                <div key={item.value}>
                                    {<FilterItemComponent
                                        itemKey={item.value}
                                        filterItem={item}
                                        filterItemCheck={filterItemCheck}
                                    />}
                                </div>
                            );
                        })
                    }
                </FilterItemWrapper>
            </FilterGroupWrapper>
        </Wrapper>
    )
}