import { Checkbox, Search } from "@equinor/eds-core-react"
import { tokens } from "@equinor/eds-tokens"
import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { FilterGroup, FilterItemCheck } from "../Types/FilterItem"
import { FilterItemComponent } from "./FilterItem/FilterItem"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: .5em;
    max-width: 200px;
    word-wrap: break-word;
    background-color: ${tokens.colors.ui.background__light.rgba};

    label{
        font-size: 1rem;
        padding: 0;
        span {
            padding: .1rem;

        }
        svg{
            height: 16px;
            width: 16px;
        }
    }
`
interface FilterGroupeComponentProps {
    filterGroup: FilterGroup,
    filterItemCheck: FilterItemCheck
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

    const group = useMemo(() => searchByValue(Object.keys(filterGroup.value), filterSearchValue), [filterSearchValue]);
    const isAllChecked = allChecked(filterGroup);
    const isIndeterminate = checkIsIndeterminate(filterGroup)

    return (
        <Wrapper>
            <h4>{filterGroup.type}</h4>
            <div>
                <Search

                    aria-label="in filer group"
                    id="search-normal"
                    placeholder="Search"
                    onChange={handleOnChange}
                    onKeyPress={handleOnKeyPress}
                />
            </div>
            <Checkbox title={"All"} label={"All"} checked={isAllChecked} indeterminate={isIndeterminate} onChange={handleOnAllChange} />
            {
                group.map((key) => {
                    const item = filterGroup.value[key];
                    return (
                        <>
                            {<FilterItemComponent
                                key={item.value}
                                filterItem={item}
                                filterItemCheck={filterItemCheck}
                            />}
                        </>
                    );
                })
            }
        </Wrapper>
    )
}